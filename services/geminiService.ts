
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  private getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.error("Gemini API Error: API_KEY is missing/empty.");
      throw new Error("API Key is missing from configuration");
    }
    return new GoogleGenAI({ apiKey });
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async chatWithCustomer(history: ChatMessage[], inventoryData: string): Promise<string> {
    const ai = this.getClient();
      
    // Optimize: Reduce history to last 5 messages to minimize token usage and prevent 429 errors
    const recentHistory = history.slice(-5).map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const config = {
      systemInstruction: `أنت "المهندس حيفان"، خبير مبيعات.
المخزون: ${inventoryData}
القواعد:
1. اقترح منتجات بديلة اذا لم يتوفر الطلب.
2. استخدم كود الشراء [#product-ID] دائماً مع المنتجات.
3. اجابتك قصيرة جداً (اقل من 40 كلمة) وباللهجة اليمنية.`,
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 300, 
    };

    let attempts = 0;
    // Exponential backoff: 2s, 4s, 8s
    const backoffDelays = [2000, 4000, 8000]; 

    while (attempts < 3) {
      try {
        // Switching to gemini-2.0-flash as it is currently more stable than 3-preview
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: recentHistory,
          config: config
        });
        
        return response.text || "حياك الله يا غالي! تفضل بسؤالك.";

      } catch (e: any) {
        attempts++;
        const errorMsg = e.message || "";
        console.warn(`Gemini Attempt ${attempts} failed: ${errorMsg}`);

        if (errorMsg.includes("429") || errorMsg.includes("exceeded") || errorMsg.includes("quota")) {
           if (attempts < 3) {
             await this.delay(backoffDelays[attempts - 1]);
             continue;
           } else {
             // Fallback response if all retries fail
             return "يا غالي، الشبكة عليها ضغط خفيف. جرب تسألني مرة ثانية الآن أو راسلنا واتساب.";
           }
        }
        
        if (errorMsg.includes("API Key")) {
           return "عذراً، المفتاح الخاص بالمساعد يحتاج تحديث. يرجى مراسلة الإدارة.";
        }
        
        await this.delay(2000);
      }
    }
    return "واجهت مشكلة بسيطة في الاتصال. تفضل بتصفح المنتجات أو راسلنا واتساب.";
  }
}

export const geminiService = new GeminiService();
