import { GoogleGenAI } from "@google/genai";
import type { ContactInfo, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are an expert AI assistant specialized in finding public contact information for individuals based on their LinkedIn profile. Your task is to use web search to find the person's name, email address, phone number, and personal or company websites. You will be given a LinkedIn profile URL.`;

export async function extractContactInfoFromUrl(profileUrl: string): Promise<{ contactInfo: ContactInfo, sources: GroundingChunk[] }> {
  const prompt = `Please find the public contact information for the person with the following LinkedIn profile: ${profileUrl}. 
  
  Return the information as a single, minified JSON object with the following keys: "name", "email", "phone", "website".
  - The "linkedinUrl" should be the provided URL: "${profileUrl}".
  - If a piece of information cannot be found, its value should be null.
  - Do not include any explanatory text or markdown formatting like \`\`\`json in your response. The response should be only the JSON object.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.0,
            tools: [{googleSearch: {}}],
        },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    const validatedData: ContactInfo = {
        name: parsedData.name || null,
        email: parsedData.email || null,
        phone: parsedData.phone || null,
        website: parsedData.website || null,
        linkedinUrl: parsedData.linkedinUrl || profileUrl,
    };
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.filter(c => c.web?.uri) || [];

    return { contactInfo: validatedData, sources };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get contact information from AI. Reason: ${error.message}`);
    }
    throw new Error("An unknown error occurred while processing the request.");
  }
}
