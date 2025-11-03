import {Handler} from '@netlify/functions';
import {GoogleGenerativeAI} from "@google/generative-ai";

interface ContactInfo {
    name: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    linkedinUrl: string | null;
}

interface GroundingChunk {
    web: {
        uri?: string;
        title?: string;
    };
}

export const handler: Handler = async (event) => {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return {statusCode: 200, headers, body: ''};
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({message: 'Method Not Allowed'}),
        };
    }

    try {
        const {profileUrl} = JSON.parse(event.body || '{}');

        if (!profileUrl || typeof profileUrl !== 'string') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({message: 'profileUrl is required in the request body'}),
            };
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY environment variable not set.");
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({message: "Server configuration error: API_KEY is missing."}),
            };
        }

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
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: "The AI response did not contain a valid JSON object."}),
                };
            }
        }

        let parsedData;
        try {
            parsedData = JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse JSON from AI response:", jsonString);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({message: "The AI returned a response that was not valid JSON."}),
            };
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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({contactInfo: validatedData, sources}),
        };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({message: `Failed to get contact information from AI. Reason: ${errorMessage}`}),
        };
    }
};
