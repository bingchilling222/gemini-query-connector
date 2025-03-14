
import { shopData } from "@/data/shopData";
import { GeminiRequest, GeminiResponse, ShopData } from "@/types/gemini";

export async function generateGeminiResponse(question: string): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("Nėra API rakto, įdėkite į .env failą.");
    }
    
    // Prepare context from shop data
    const contextText = shopData
      .map(shop => `Shop: ${shop.name}, Description: ${shop.description}`)
      .join("\n");
    
    // Add context to question
    const fullPrompt = `Context (reference only, do not mention this in your answer):\n${contextText}\n\nQuestion: ${question}`;
    
    // Updated API endpoint to use the correct version and model
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
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
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API klaida: ${errorData.error?.message || response.statusText}`);
    }
    
    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("Atsakymas nesugeneruotas");
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Klaida generuojant atsakymą: ", error);
    throw error;
  }
}
