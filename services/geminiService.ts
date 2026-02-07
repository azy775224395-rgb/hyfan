
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
      
    // Optimize history: Keep only last 10 messages to reduce token usage and avoid 429
    const recentHistory = history.slice(-10).map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const config = {
      systemInstruction: `أنت "المهندس حيفان"، خبير مبيعات "متجر حيفان للطاقة" باليمن.
المخزون:
${inventoryData}

تعليمات:
1. بع بذكاء. اقترح منتجات بديلة إذا لم يتوفر الطلب.
2. استخدم كود الشراء [#product-ID] عند اقتراح منتج.
3. اختصر الإجابة (لا تتجاوز 50 كلمة إلا للشرح الهندسي).
4. اللهجة يمنية محترمة ("يا غالي").`,
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 500, // Limit output to save quota
    };

    let attempts = 0;
    // Increased delay times: 2s, 5s, 8s
    const backoffDelays = [2000, 5000, 8000]; 

    while (attempts < 3) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
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
             return "يا غالي، السيرفر عليه ضغط حالياً. ممكن تعيد السؤال بعد دقيقة؟ أو راسلنا واتساب للسرعة.";
           }
        }
        
        // Critical Error (Auth or Model missing)
        if (errorMsg.includes("API Key") || errorMsg.includes("404")) {
           return "عذراً، نظام الذكاء الاصطناعي قيد الصيانة. يرجى التواصل عبر الواتساب.";
        }
        
        // Generic error retry
        await this.delay(2000);
      }
    }
    return "واجهت مشكلة تقنية بسيطة. تفضل بتصفح المنتجات أو راسلنا واتساب.";
  }
}

export const geminiService = new GeminiService();
