import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || ''; 

// Safe initialization
const getAI = () => {
  if (!API_KEY) return null;
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const generateAIResponse = async (prompt: string): Promise<string> => {
  const ai = getAI();
  if (!ai) {
    // Fallback if no key is provided
    return new Promise(resolve => setTimeout(() => resolve("I can help you with tournament schedules, rules, and fantasy picks! Please configure my API Key to get real-time insights."), 1000));
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are the official AI Assistant for the Esports World Cup. You provide helpful, enthusiastic, and concise information about tournaments, players, schedules, and fantasy esports. Keep answers short and engaging.",
      }
    });
    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the network right now.";
  }
};