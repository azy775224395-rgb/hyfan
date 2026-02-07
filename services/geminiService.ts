
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

  async chatWithCustomer(history: ChatMessage[], inventoryData: string): Promise<string> {
    try {
      const ai = this.getClient();
      
      const contents = history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      // استخدام gemini-3-flash-preview للمهام النصية
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', 
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
          temperature: 0.6,
          topP: 0.95,
          topK: 64,
        }
      });
      
      return response.text || "حياك الله يا غالي! أنا المهندس حيفان. تفضل بسؤالك عن أي لوح أو بطارية.";
    } catch (e: any) {
      console.error("Hayfan AI Error Details:", e);
      const errorMsg = e.message || "Unknown Error";
      if (errorMsg.includes("404")) {
         return "يا غالي، المعذرة. يبدو أن النموذج الذكي قيد التحديث حالياً (Error 404). يرجى المحاولة بعد قليل أو مراسلتنا واتساب.";
      }
      if (errorMsg.includes("API Key")) {
         return "يا غالي، يبدو أن مفتاح التفعيل (API Key) غير مربوط بشكل صحيح في إعدادات الموقع. يرجى التأكد من إضافته في Render.";
      }
      return `يا غالي، المعذرة منك. واجهت مشكلة فنية بسيطة (${errorMsg.substring(0, 50)}...). يمكنك تصفح المنتجات مباشرة أو مراسلتنا واتساب.`;
    }
  }
}

export const geminiService = new GeminiService();
