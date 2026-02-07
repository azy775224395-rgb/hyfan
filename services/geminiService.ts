
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  private getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("Gemini API Error: API_KEY is missing. Please add it to your Render Environment Variables.");
      throw new Error("API Key is missing");
    }
    return new GoogleGenAI({ apiKey });
  }

  async chatWithCustomer(history: ChatMessage[], inventoryData: string): Promise<string> {
    try {
      const ai = this.getClient();
      
      // تحويل سجل الرسائل إلى صيغة تفهمها Gemini مع الحفاظ على الترتيب الزمني
      const contents = history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', // نموذج سريع وقوي للنصوص
        contents: contents,
        config: {
          systemInstruction: `أنت "المهندس حيفان" (Hayfan AI)، الخبير الهندسي ومسؤول المبيعات الأول في "متجر حيفان للطاقة المتجددة" باليمن لعام 2026.
          
المخزون المتوفر والأسعار (هذا هو مصدرك الوحيد):
${inventoryData}

قواعد الذكاء الاصطناعي الصارمة:
1. **الشخصية:** تحدث كمهندس يمني خبير ("يا غالي"، "أبشر"، "على عيني"). أنت لست مجرد بوت، أنت مستشار يهدف للبيع بذكاء.
2. **الهدف:** لا تجب فقط، بل **بع**. إذا سأل العميل عن "مروحة"، اقترح عليه "منظومة كاملة" أو "بطارية" معها.
3. **الدقة الهندسية:**
   - إذا ذكر العميل أحمال (مثلاً: ثلاجة ومكيف)، قم بحساب الواط والساعات بسرعة في عقلك واقترح السعة المناسبة.
   - مثال: "لتشغيل ثلاجة 24 ساعة، تحتاج على الأقل 4 ألواح وبطاريتين 200 أمبير".
4. **تفعيل الشراء (هام جداً):**
   - عندما تقترح أي منتج من المخزون، يجب أن ترفق معه زر الشراء باستخدام الكود: [#product-ID].
   - مثال: "أنصحك ببطارية توبو العملاقة [#product-b2] لأنها الأقوى في السوق حالياً."
   - لا تذكر منتجاً دون الكود الخاص به إذا كان متوفراً في المخزون أعلاه.
5. **الإغلاق:** حاول دائماً إغلاق البيعة. "هل أضيفها لسلتك الآن؟"، "الكمية محدودة، أحجز لك واحدة؟".

تذكر: أنت واجهة المتجر. اجعل العميل يشعر بالثقة والاحترافية.`,
          temperature: 0.6, // توازن بين الإبداع والدقة
          topP: 0.95,
          topK: 64,
        }
      });
      
      return response.text || "حياك الله يا غالي! أنا المهندس حيفان. يبدو أن الاتصال ضعيف قليلاً، لكن تفضل بسؤالك عن أي لوح أو بطارية، وأنا جاهز لخدمتك بعيوني.";
    } catch (e: any) {
      console.error("Hayfan AI Error:", e);
      return "يا غالي، المعذرة منك. يبدو أن هناك ضغط كبير على السيرفرات حالياً أو أن مفتاح التفعيل غير موجود في الإعدادات (API Key Missing). لكن لا تقلق، يمكنك تصفح المنتجات مباشرة أو مراسلتنا واتساب إذا كان الأمر عاجلاً. نحن بخدمتك!";
    }
  }
}

export const geminiService = new GeminiService();
