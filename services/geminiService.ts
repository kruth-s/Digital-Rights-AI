
import { GoogleGenAI, Type } from "@google/genai";
import { COPYRIGHT_ANALYSIS_SYSTEM_PROMPT } from "../lib/prompts";
import { AnalysisResult } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeTextWithGemini = async (text: string): Promise<AnalysisResult> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `Analyze this text for copyright risk:\n\n${text}` }] }],
      config: {
        systemInstruction: COPYRIGHT_ANALYSIS_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            reasons: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            signals: {
              type: Type.OBJECT,
              properties: {
                mentions_known_titles: { type: Type.BOOLEAN },
                has_citation_patterns: { type: Type.BOOLEAN },
                looks_like_code: { type: Type.BOOLEAN },
                looks_like_news_article: { type: Type.BOOLEAN },
                looks_like_academic_paper: { type: Type.BOOLEAN },
                looks_like_lyrics_or_book: { type: Type.BOOLEAN }
              },
              required: ["mentions_known_titles", "has_citation_patterns", "looks_like_code", "looks_like_news_article", "looks_like_academic_paper", "looks_like_lyrics_or_book"]
            },
            safety_notes: { type: Type.STRING }
          },
          required: ["classification", "confidence", "reasons", "signals", "safety_notes"]
        }
      }
    });

    const resultText = response.text || "";
    const jsonResult: AnalysisResult = JSON.parse(resultText);
    return jsonResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
