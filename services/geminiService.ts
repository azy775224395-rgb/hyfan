
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  private getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key is missing");
    return new GoogleGenAI({ apiKey });
  }

  async chatWithCustomer(history: ChatMessage[], context: string): Promise<string> {
    try {
      const ai = this.getClient();
      
      // تحويل سجل الرسائل إلى الصيغة المطلوبة لـ Gemini
      const contents = history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // استخدام البرو للمهام الهندسية المعقدة
        contents: contents,
        config: {
          systemInstruction: `أنت "المهندس المعتمد" لمتجر حيفان للطاقة المتجددة في اليمن. مهمتك هي تقديم استشارات هندسية دقيقة للعملاء وبناء ثقة عميقة.

قواعد التعامل الصارمة:
1. الشخصية: أنت مهندس يمني خبير، ودود، وناصح (استخدم عبارات مثل: نورتنا يا غالي، أبشر من عيوني، مصلحتك تهمنا).
2. الذاكرة: يجب أن تتذكر كل ما قاله العميل في هذه الجلسة وتنبني ردودك عليه.
3. الذكاء التقني:
   - عند السؤال عن منظومة، اسأل العميل عن الأجهزة التي يريد تشغيلها (وات، فولت).
   - احسب الأحمال برأسك قبل الرد: (الوات الكلي × ساعات التشغيل).
4. إدارة المخزون (Inventory Management):
   - اعتمد كلياً على قائمة المنتجات أدناه.
   - لا تقترح أي منتج غير موجود في القائمة.
   - إذا طلب منتجاً غير متوفر، اقترح فوراً "البديل الهندسي الأنسب" من القائمة (مثلاً: نفدت بطارية 150؟ اقترح الـ 200 واشرح ميزتها).
5. الروابط: وجه العميل دائماً لتصفح المنتج باستخدام الرابط الداخلي بصيغة ${window.location.origin}/#product-[ID]

قائمة المنتجات والمخزون الحية:
${context}`,
          temperature: 0.7, // رفع الحرارة قليلاً لجعل الردود أكثر إنسانية وتفاعلية
          topP: 0.95,
          topK: 40
        }
      });
      
      return response.text?.trim() || "أهلاً بك يا غالي. أنا مهندس حيفان، تفضل بسؤالك وسأقوم بتصميم منظومتك الآن.";
    } catch (e) {
      console.error("Gemini API Error:", e);
      return "المعذرة يا غالي، يبدو أن هناك ضغطاً على النظام حالياً. أنا مهندس حيفان، وباختصار نحن نوفر أفضل ألواح جينكو وبطاريات توبو في اليمن. ما هو طلبك لكي أساعدك؟";
    }
  }
}

export const geminiService = new GeminiService();
