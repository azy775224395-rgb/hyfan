
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  /**
   * Always create a new GoogleGenAI instance right before making an API call
   * to ensure it uses the most up-to-date API key from the environment.
   */
  private getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateProductDescription(productName: string): Promise<string> {
    try {
      const ai = this.getClient();
      // Using gemini-3-flash-preview for Basic Text Tasks as recommended.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `اكتب وصفاً تسويقياً جذاباً ومختصراً لمنتج طاقة متجددة يسمى: "${productName}". اجعل الوصف باللغة العربية بأسلوب احترافي يركز على الكفاءة والتوفير.`,
      });
      // Correctly accessing the text property as per guidelines.
      return response.text || "منتج عالي الجودة من حيفان للطاقة.";
    } catch (e) {
      console.error("AI Error:", e);
      return "منتج عالي الجودة من حيفان للطاقة.";
    }
  }

  async chatWithCustomer(message: string, context: string): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: {
          systemInstruction: `أنت "المهندس الاستشاري لمتجر حيفان للطاقة المتجددة" (إصدار 2026).
          مهامك الأساسية:
          1. تقديم استشارات تقنية عميقة: اشرح للعملاء الفرق بين ألواح N-Type (الأكثر كفاءة حالياً) وألواح P-Type.
          2. خبرة البطاريات: تحدث باحترافية عن دورات الشحن (Cycles) في بطاريات الليثيوم LiFePO4 مقارنة ببطاريات الجل، ووضح لماذا الليثيوم أفضل للمنظومات الذكية.
          3. حساب الأحمال: إذا أخبرك العميل بأجهزته، قم بحساب استهلاك الوات/ساعة بدقة واقترح عدد الألواح وسعة البطاريات والإنفرتر المناسب من "قائمة منتجات حيفان" المتوفرة في السياق.
          
          سياق المنتجات المتوفرة:
          ${context}
          
          قواعد صارمة للرد:
          - ممنوع التوجيه للواتساب في بداية المحادثة. أجب على كل الأسئلة التقنية والأسعار بنفسك أولاً.
          - لا تذكر واتساب إلا في حالتين فقط: (أ) العميل قال "أريد الشراء الآن"، (ب) العميل طلب التحدث مع موظف بشري أو سأل عن تفاصيل الشحن المعقدة.
          - لغة الرد: عربية فصحى مبسطة أو لهجة يمنية بيضاء محترمة.
          - كن واثقاً: أنت خبير في ماركات مثل Jinko, Growatt, و TUBO.
          - رقم واتساب الطلبات (للطوارئ فقط): 967784400333.`,
        }
      });
      // Correctly accessing the text property as per guidelines.
      return response.text || "عذراً، أواجه مشكلة تقنية بسيطة. كيف يمكنني مساعدتك في حساب أحمال منظومتك؟";
    } catch (e) {
      console.error("Chat Error:", e);
      return "أهلاً بك في حيفان، يرجى المحاولة لاحقاً أو مراجعة قسم الأسئلة الشائعة.";
    }
  }
}

export const geminiService = new GeminiService();
