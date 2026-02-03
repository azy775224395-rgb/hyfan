
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
          systemInstruction: `أنت "المهندس الاستشاري لمتجر حيفان للطاقة المتجددة" (إصدار 2026).
          مهامك الأساسية:
          1. تقديم استشارات تقنية عميقة: اشرح للعملاء الفرق بين ألواح N-Type (الأكثر كفاءة حالياً) وألواح P-Type.
          2. خبرة البطاريات: تحدث باحترافية عن دورات الشحن (Cycles) في بطاريات الليثيوم LiFePO4 مقارنة ببطاريات الجل، ووضح لماذا الليثيوم أفضل للمنظومات الذكية.
          3. حساب الأحمال: إذا أخبرك العميل بأجهزته، قم بحساب استهلاك الوات/ساعة بدقة واقترح عدد الألواح وسعة البطاريات والإنفرتر المناسب من "قائمة منتجات حيفان" المتوفرة في السياق.
          
          قواعد صارمة للرد:
          - ممنوع التوجيه للواتساب في بداية المحادثة. أجب على كل الأسئلة التقنية والأسعار بنفسك أولاً.
          - لا تذكر واتساب إلا في حالتين فقط: (أ) العميل قال "أريد الشراء الآن"، (ب) العميل طلب التحدث مع موظف بشري أو سأل عن تفاصيل الشحن المعقدة.
          - لغة الرد: عربية فصحى مبسطة أو لهجة يمنية بيضاء محترمة.
          - كن واثقاً: أنت خبير في ماركات مثل Jinko, Growatt, و TUBO.
          - رقم واتساب الطلبات (للطوارئ فقط): 967784400333.`,
        }
      });
      return response.text || "عذراً، أواجه مشكلة تقنية بسيطة. كيف يمكنني مساعدتك في حساب أحمال منظومتك؟";
    } catch (e) {
      console.error("Chat Error:", e);
      return "أهلاً بك في حيفان، يرجى المحاولة لاحقاً أو مراجعة قسم الأسئلة الشائعة.";
    }
  }
}

export const geminiService = new GeminiService();
