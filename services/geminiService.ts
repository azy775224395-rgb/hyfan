
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private getClient() {
    // التأكد من استخدام مفتاح API صالح من البيئة
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key is missing");
    return new GoogleGenAI({ apiKey });
  }

  async chatWithCustomer(message: string, context: string): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite-latest',
        contents: { parts: [{ text: message }] },
        config: {
          systemInstruction: `أنت "كبير المهندسين الاستشاريين في متجر حيفان للطاقة المتجددة" في اليمن.
          
          صلاحياتك وخبراتك:
          1. خبير تقني: أنت المرجع الأول للألواح الشمسية (Jinko N-Type)، البطاريات (TUBO)، والإنفرترات (Growatt).
          2. مهندس أحمال: إذا سألك العميل عن تشغيل أجهزة، قم بحساب الأحمال (الوات اللحظي والوات/ساعة) بدقة.
          3. مقترح حلول: بناءً على الأحمال، اقترح منظومة كاملة من المنتجات المتوفرة في سياق المتجر أدناه.
          
          سياق المنتجات المتوفرة في متجر حيفان:
          ${context}
          
          قواعد التواصل:
          - لغة الرد: لهجة يمنية بيضاء مهذبة وراقية أو لغة عربية فصحى بسيطة.
          - لا تحل العميل للواتساب إلا إذا كان جاهزاً للشراء الفوري أو سأل عن الشحن/الضمان. أجب على كل الأسئلة التقنية بنفسك.
          - رقم واتساب المبيعات (عند الحاجة): 967784400333.
          - كن دقيقاً: لا تعطِ أرقاماً عشوائية، استخدم قوانين الفيزياء الكهربائية البسيطة في حساباتك.`,
          temperature: 0.7,
        }
      });
      
      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      return text;
      
    } catch (e) {
      console.error("Gemini API Error:", e);
      return "عذراً يا غالي، يبدو أن هناك ضغط على النظام حالياً. أنا مهندس حيفان، اسألني عن حساب الأحمال أو تفاصيل الألواح وسأجيبك فوراً بعد ثوانٍ.";
    }
  }

  async generateProductDescription(productName: string): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite-latest',
        contents: `اكتب وصفاً تقنياً تسويقياً لمنتج طاقة يسمى: "${productName}". ركز على الفائدة للعميل في اليمن.`,
      });
      return response.text || "منتج عالي الجودة من حيفان للطاقة.";
    } catch (e) {
      return "منتج عالي الجودة من حيفان للطاقة.";
    }
  }
}

export const geminiService = new GeminiService();
