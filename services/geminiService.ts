
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  private getClient() {
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY
    // @ts-ignore
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("Gemini Service Error: API Key is missing! Please check your .env file.");
      return null;
    }
    return new GoogleGenAI({ apiKey });
  }

  // دالة المهلة
  private timeout(ms: number) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));
  }

  private getFallbackResponse(lastUserMessage: string = ""): string {
    const msg = lastUserMessage.toLowerCase();
    
    // ردود احتياطية ذكية تعتمد على الكلمات المفتاحية
    if (msg.includes("سعر") || msg.includes("بكم") || msg.includes("تكلفة")) {
      return "الأسعار حالياً يا غالي: \n- لوح جينكو 580 وات: 950 ر.س \n- بطارية توبو 200 أمبير: 1800 ر.س \n- بطارية توبو 150 أمبير: 1400 ر.س \n\nتحب أرفع لك طلب؟";
    }
    if (msg.includes("بطاريه") || msg.includes("بطارية") || msg.includes("جل") || msg.includes("ليثيوم")) {
      return "عندنا بطاريات TUBO (جل حقيقي) بضمان سنة:\n- 150 أمبير (وزن 61 كجم)\n- 200 أمبير (وزن 68.5 كجم)\nممتازة جداً لتشغيل البيت كامل.";
    }
    if (msg.includes("لوح") || msg.includes("الواح") || msg.includes("شمسية")) {
      return "متوفر ألواح Jinko N-Type (موديل 2026) بقدرة 580 وات. كفاءة عالية حتى مع الغيوم وضمان 25 سنة.";
    }
    if (msg.includes("عنوان") || msg.includes("موقع") || msg.includes("وين")) {
      return "موقعنا: صنعاء - شارع تعز. \nونشحن لكل المحافظات (عدن، تعز، إب، ذمار، حضرموت...) خلال 24 ساعة.";
    }
    
    // Fallback عام في حال الفشل التام
    return "حياك الله! 🌹\nأنا المهندس حيفان. حالياً الشبكة عليها ضغط، لكن تفضل بسؤالك عن (الأسعار، البطاريات، الألواح) وبجاوبك فوراً.";
  }

  async chatWithCustomer(history: ChatMessage[], inventoryData: string): Promise<string> {
    const ai = this.getClient();
    const lastMessage = history[history.length - 1]?.text || "";

    if (!ai) {
      console.log("Gemini Fallback: No API Key found.");
      return this.getFallbackResponse(lastMessage);
    }

    const contents = history.slice(-8).map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const systemInstruction = `
      أنت "المهندس حيفان"، خبير ومستشار مبيعات في "حيفان للطاقة" في اليمن.
      المخزون المتوفر: ${inventoryData.substring(0, 3000)}
      
      تعليمات صارمة للشخصية:
      1. تحدث بلهجة يمنية صنعانية محببة (يا غالي، حياك الله، أبشر، ما يهمك).
      2. أنت موظف مبيعات محترف، هدفك إقناع العميل بالشراء بأدب.
      3. إجاباتك يجب أن تكون قصيرة ومباشرة (لا تتجاوز 3 أسطر إلا عند الضرورة).
      4. العملة المستخدمة دائماً هي الريال السعودي (ر.س).
    `;

    try {
      // المحاولة الأولى: موديل ذكي (Gemini 3) بمهلة قصيرة نسبياً (12 ثانية)
      // إذا تأخر، نعتبره فشل وننتقل للموديل الأسرع
      const response: any = await Promise.race([
        ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.4,
            maxOutputTokens: 300,
          },
        }),
        this.timeout(12000) // Timeout after 12 seconds
      ]);

      const text = response?.text;
      if (!text) throw new Error("Empty response");
      return text;

    } catch (error: any) {
      console.warn("Gemini Primary Model Error:", error.message || error);
      
      // المحاولة الثانية: الموديل السريع جداً (Gemini 2.5 Flash Latest)
      // نلجأ إليه فوراً عند تأخر الموديل الأول
      try {
        console.log("Switching to fast fallback model...");
        const retryResponse: any = await ai.models.generateContent({
          model: 'gemini-2.5-flash-latest',
          contents: contents,
          config: { 
            systemInstruction, 
            temperature: 0.4 
          }
        });
        if (retryResponse?.text) return retryResponse.text;
      } catch (retryError) {
        console.error("Retry failed:", retryError);
      }

      // الملاذ الأخير: الردود الجاهزة
      return this.getFallbackResponse(lastMessage);
    }
  }
}

export const geminiService = new GeminiService();
