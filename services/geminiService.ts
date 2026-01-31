import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getClient() {
    if (!this.ai) {
      const apiKey = process.env.API_KEY || "";
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  async generateProductDescription(productName: string): Promise<string> {
    try {
      const client = this.getClient();
      const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: `اكتب وصفاً تسويقياً جذاباً ومختصراً لمنتج طاقة متجددة يسمى: "${productName}". اجعل الوصف باللغة العربية بأسلوب احترافي يركز على الكفاءة والتوفير.` }] }],
      });
      return response.text || "عذراً، لم أتمكن من إنشاء وصف حالياً.";
    } catch (e) {
      console.error("AI Error:", e);
      return "منتج عالي الجودة من حيفان للطاقة.";
    }
  }

  async chatWithCustomer(message: string, context: string): Promise<string> {
    try {
      const client = this.getClient();
      const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: `أنت مساعد خبير في أنظمة الطاقة الشمسية لمتجر "حيفان للطاقة المتجددة". 
          سياق المتجر الحالي ومنتجاته: ${context}. 
          مهمتك هي مساعدة العملاء في اختيار الألواح والبطاريات المناسبة لاحتياجاتهم المنزلية. 
          كن ودوداً، مهذباً، وقدم نصائح تقنية دقيقة باللغة العربية. 
          أخبر العملاء أن بإمكانهم الطلب مباشرة عبر واتساب من خلال زر الطلب الموجود على كل منتج.`,
        }
      });
      return response.text || "عذراً، أنا أواجه مشكلة في الرد حالياً.";
    } catch (e) {
      console.error("Chat Error:", e);
      return "أهلاً بك، يرجى التواصل معنا عبر واتساب مباشرة للمساعدة السريعة.";
    }
  }
}

export const geminiService = new GeminiService();