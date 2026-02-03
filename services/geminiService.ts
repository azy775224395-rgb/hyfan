
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getClient() {
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
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
      return response.text || "منتج عالي الجودة من حيفان للطاقة.";
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
          systemInstruction: `أنت "استشاري حيفان الذكي"، خبير عالمي في أنظمة الطاقة الشمسية والحلول المستدامة.
          
          سياق عملك:
          1. أنت تعمل لمتجر "حيفان للطاقة المتجددة" في اليمن (عام 2026).
          2. لديك قائمة بالمنتجات المتوفرة بأسعارها ومواصفاتها (موجودة في سياق الرسالة).
          
          قواعد الرد:
          - كن تقنياً ومحترفاً: اشرح الفرق بين بطاريات الليثيوم (عمر أطول، شحن أسرع) وبطاريات الجل (تكلفة أقل).
          - حساب الأحمال: إذا طلب العميل حساب منظومة، اسأله عن الأجهزة (ثلاجة، إضاءة، مراوح) ثم قدم له مقترحاً بالألواح والبطاريات المناسبة من منتجاتنا.
          - لغة الرد: اللغة العربية بلهجة بيضاء واضحة ومحترمة.
          - المنتجات المتاحة: استخدم المنتجات الموجودة في السياق فقط عند تقديم توصيات.
          - متى تذكر واتساب؟: فقط وفقط إذا طلب العميل الشراء، أو سأل عن السعر النهائي لطلب كمية، أو أراد التحدث مع موظف بشري. غير ذلك، أجب على كافة أسئلته التقنية بنفسك.
          - المعرفة التقنية: أنت تعرف أن ألواح N-Type أفضل من P-Type، وتعرف كفاءة إنفرترات Growatt، وتعرف أن بطاريات Tubo 200Ah ممتازة للأحمال المتوسطة. استخدم هذه المعرفة لتعزيز ثقة العميل.`,
        }
      });
      return response.text || "عذراً، أنا أواجه مشكلة في معالجة طلبك حالياً. هل يمكنك المحاولة مرة أخرى؟";
    } catch (e) {
      console.error("Chat Error:", e);
      return "أهلاً بك، يرجى المحاولة لاحقاً أو التواصل مع الدعم الفني مباشرة.";
    }
  }
}

export const geminiService = new GeminiService();
