
import { GoogleGenAI, Modality } from "@google/genai";

// Use the specific Nano Banana model alias as per requirements
const MODEL_NAME = 'gemini-2.5-flash-image';

export const generateHairStyle = async (base64Image: string, stylePrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  // Extract mime type from data URL if present, otherwise default to png
  const mimeMatch = base64Image.match(/^data:(image\/[a-zA-Z+]+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';

  // Clean base64 string if it contains metadata header
  const cleanBase64 = base64Image.includes('base64,') 
    ? base64Image.split('base64,')[1] 
    : base64Image;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
          {
            text: `Edit this image: ${stylePrompt}. Maintain the original face identity, lighting, and background exactly as they are. Only change the hair. High quality, photorealistic 8k.`
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    
    if (part && part.inlineData && part.inlineData.data) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }

    throw new Error("No image data received from the model.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
