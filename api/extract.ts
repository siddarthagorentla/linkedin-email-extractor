import {GoogleGenerativeAI} from "@google/generative-ai";
import type { ContactInfo, GroundingChunk } from '../types';

// This is a Vercel serverless function.
// It will be deployed to /api/extract

// Using "export const config" is not standard for Vercel's default runtime.
// Instead, we export a default handler function.
// Vercel automatically provides req and res objects compatible with Express.
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { profileUrl } = req.body;

  if (!profileUrl || typeof profileUrl !== 'string') {
    return res.status(400).json({ message: 'profileUrl is required in the request body' });
  }

    if (!process.env.GEMINI_API_KEY && !process.env.API_KEY) {
    console.error("API_KEY environment variable not set on the server.");
    return res.status(500).json({ message: "Server configuration error: API_KEY is missing." });
  }

  try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey!);

      const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash-001",
          systemInstruction: `You are an expert AI assistant specialized in finding public contact information. Given a LinkedIn profile URL, use web search to find the person's full name, public email address, phone number, and any personal or company websites. You must return the information as a JSON object. If a piece of information cannot be found, its value in the JSON should be null. The JSON object should have the following properties: "name", "email", "phone", "website", "linkedinUrl".`,
      });

      const prompt = `Find the public contact information for the person with this LinkedIn profile: ${profileUrl}. The 'linkedinUrl' field in the JSON response must be this exact URL. Respond with only the JSON object.`;

      const result = await model.generateContent({
          contents: [{role: 'user', parts: [{text: prompt}]}],
          generationConfig: {
              temperature: 0.0,
          },
          tools: [{googleSearch: {}}],
    });

      const response = result.response;
      const responseText = response.text().trim();
    
    const jsonBlockRegex = /```json\s*([\s\S]+?)\s*```/;
    const jsonMatch = responseText.match(jsonBlockRegex);
    
    let jsonString;
    if (jsonMatch && jsonMatch[1]) {
        jsonString = jsonMatch[1];
    } else {
        const firstBrace = responseText.indexOf('{');
        const lastBrace = responseText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace > firstBrace) {
            jsonString = responseText.substring(firstBrace, lastBrace + 1);
        } else {
            console.error("Failed to find a JSON block in the AI response on the server:", responseText);
            return res.status(500).json({ message: "The AI response did not contain a valid JSON object." });
        }
    }

    let parsedData;
    try {
        parsedData = JSON.parse(jsonString);
    } catch(e) {
        console.error("Failed to parse JSON from AI response on the server:", jsonString);
        return res.status(500).json({ message: "The AI returned a response that was not valid JSON." });
    }

    const validatedData: ContactInfo = {
        name: parsedData.name || null,
        email: parsedData.email || null,
        phone: parsedData.phone || null,
        website: parsedData.website || null,
        linkedinUrl: parsedData.linkedinUrl || profileUrl,
    };

      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      const groundingChunks = groundingMetadata?.groundingChunks || [];
    
    const sources: GroundingChunk[] = groundingChunks
        .filter((c: any) => c.web?.uri)
        .map((c: any) => ({web: c.web!}));

    // Send the successful response back to the client
    return res.status(200).json({ contactInfo: validatedData, sources });

  } catch (error) {
    console.error("Error calling Gemini API on the server:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return res.status(500).json({ message: `Failed to get contact information from AI. Reason: ${errorMessage}`});
  }
}
