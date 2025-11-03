
import type { ContactInfo, GroundingChunk } from '../types';

export async function extractContactInfoFromUrl(profileUrl: string): Promise<{ contactInfo: ContactInfo, sources: GroundingChunk[] }> {
    // Try to use the API endpoint first (for production/Vercel)
  try {
    const response = await fetch('/api/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileUrl }),
    });

      if (response.ok) {
      const text = await response.text();
        if (text) {
            return JSON.parse(text);
      }
    }
  } catch (apiError) {
      console.log('API endpoint not available, using direct client call...');
  }

    // Fallback: Call Gemini API directly from client (development mode)
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

        if (!apiKey) {
            throw new Error('API key not configured. Please check your .env.local file.');
        }

      const {GoogleGenerativeAI} = await import("@google/generative-ai");

      const genAI = new GoogleGenerativeAI(apiKey);

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
              console.error("Failed to find a JSON block in the AI response:", responseText);
              throw new Error("The AI response did not contain a valid JSON object.");
      }
    }

      let parsedData;
      try {
          parsedData = JSON.parse(jsonString);
      } catch (e) {
          console.error("Failed to parse JSON from AI response:", jsonString);
          throw new Error("The AI returned a response that was not valid JSON.");
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

      return {contactInfo: validatedData, sources};

  } catch (error) {
      console.error("Error calling Gemini API:", error);

      if (error instanceof Error) {
          throw new Error(`Failed to get contact information. Reason: ${error.message}`);
      }
    throw new Error("An unknown error occurred while processing the request.");
  }
}
