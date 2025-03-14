
import { GeminiRequest, GeminiResponse, ShopData } from "@/types/gemini";

export const shopData: ShopData[] = [
  { name: "Maxima", description: "Lithuanian retail chain offering groceries and household goods." },
  { name: "Iki", description: "Popular supermarket chain with fresh products and wide selection." },
  { name: "Rimi", description: "Supermarket chain focused on quality and sustainable products." },
  { name: "Norfa", description: "Discount supermarket with affordable prices for everyday shopping." },
  { name: "Lidl", description: "International discount grocery store with weekly special offers." },
];

export async function generateGeminiResponse(question: string): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("Missing Gemini API key. Please add it to your .env.local file.");
    }
    
    // Prepare context from shop data
    const contextText = shopData
      .map(shop => `Shop: ${shop.name}, Description: ${shop.description}`)
      .join("\n");
    
    // Add context to question
    const fullPrompt = `Context (reference only, do not mention this in your answer):\n${contextText}\n\nQuestion: ${question}`;
    
    const payload: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: fullPrompt
            }
          ]
        }
      ]
    };
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response generated");
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}
