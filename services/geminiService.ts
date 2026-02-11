
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, SchemeMatch } from "../types";
import { SYSTEM_PROMPT, POPULAR_SCHEMES } from "../constants";

export const matchSchemesWithAI = async (profile: UserProfile): Promise<SchemeMatch[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        User Profile: ${JSON.stringify(profile)}
        Available Schemes Context: ${JSON.stringify(POPULAR_SCHEMES)}
        
        Please evaluate the match for these schemes.
      `,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || '{"matches": []}');
    
    // Merge AI scores with actual scheme data
    return result.matches.map((match: any) => {
      const original = POPULAR_SCHEMES.find(s => s.id === match.id);
      if (!original) return null;
      return {
        ...original,
        matchPercentage: match.matchPercentage,
        reasoning: match.reasoning,
        missingCriteria: match.missingCriteria
      };
    }).filter(Boolean) as SchemeMatch[];

  } catch (error) {
    console.error("Error matching schemes:", error);
    // Fallback logic if AI fails
    return POPULAR_SCHEMES.map(s => ({
      ...s,
      matchPercentage: 50,
      reasoning: "Automated analysis unavailable. Please check official site.",
      missingCriteria: []
    }));
  }
};

export const searchNewSchemes = async (query: string, profile: UserProfile) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find new Indian government schemes related to: "${query}". 
        User Context: ${JSON.stringify(profile)}. 
        Tell me if they might be eligible based on their profile.`,
        config: {
            tools: [{ googleSearch: {} }]
        }
    });

    return {
        text: response.text,
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
};
