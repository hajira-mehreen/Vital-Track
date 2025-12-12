
import { GoogleGenAI, Type } from "@google/genai";
import { HealthMetric, CheckupRecord } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHealthSummary = async (metrics: HealthMetric[], records: CheckupRecord[]) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Based on the following health data, provide a concise wellness summary and 3 actionable tips.
    
    Recent Metrics:
    ${JSON.stringify(metrics.slice(-7))}
    
    Last Medical Record:
    ${JSON.stringify(records[0] || 'No records available')}
    
    Format the response as JSON with properties: "summary" (string) and "tips" (array of strings).
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            tips: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "tips"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Health Summary Error:", error);
    return {
      summary: "Stay hydrated and maintain a balanced diet. Consult your doctor for specific advice.",
      tips: ["Drink 8 glasses of water daily", "Aim for 30 mins of light activity", "Get 7-8 hours of sleep"]
    };
  }
};
