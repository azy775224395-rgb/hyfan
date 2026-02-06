
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  private getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key is missing from environment");
    return new GoogleGenAI({ apiKey });
  }

  /**
   * إرسال المحادثة بالكامل للنموذج لضمان وجود ذاكرة (Multi-turn chat)
   */
  async chatWithCustomer(history: ChatMessage[], inventoryData: string): Promise<string> {
    try {
      const ai = this.getClient();
      
      // تحويل السجل لصيغة Gemini: يجب أن يبدأ التاريخ بمصداقية عالية
      // نحذف أول رسالة ترحيبية من النموذج لأنها رسالة ثابتة لا يحتاجها الموديل للتعلم
      const contents = history.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // النموذج الاحترافي للمهام الهندسية
        contents: contents,
        config: {
          systemInstruction: `أنت "المهندس وليد"، كبير مهندسي متجر حيفان للطاقة المتجددة في اليمن (2026).
مهمتك: تصميم منظومات طاقة شمسية ذكية وبيع المنتجات المتوفرة بناءً على مخزوننا السحابي.

قاعدة البيانات الحية (المخزون المتوفر الآن):
${inventoryData}

تعليمات السلوك المهني:
1. الذاكرة: تذكر دائماً تفاصيل الأجهزة التي ذكرها العميل في بداية الشات.
2. الخبرة: أنت مهندس يمني ناصح. استخدم عبارات مثل (يا غالي، نورتنا، مصلحتك أولاً، أبشر).
3. الحسابات: إذا سأل العميل عن تشغيل أجهزة، قم بحساب الأحمال فوراً (وات × ساعات).
4. البيع الذكي: اقترح المنتجات من "قاعدة البيانات" أعلاه بالاسم والسعر. إذا طلب شيئاً غير موجود، اقترح البديل الأفضل المتوفر لدينا (مثلاً: بديل بطارية توبو هو بطارية أخرى بنفس السعة).
5. الروابط: وجه العميل لاستخدام روابط المنتجات الداخلية بصيغة: /#product-[ID]
6. المبادرة: لا تكن مجرد مجيب. اسأل العميل: (ما هي الأجهزة التي تريد تشغيلها؟ كم فولت؟ كم ميزانيتك؟) لتصمم له المنظومة الأفضل.

أنت الآن في محادثة مباشرة مع عميل يمني، ابدأ بتقديم استشارة هندسية حقيقية.`,
          temperature: 0.9, // جعل الردود أكثر حيوية وتفاعلية
          topP: 0.95,
        }
      });
      
      const text = response.text;
      if (!text) throw new Error("Empty AI response");
      
      return text.trim();
    } catch (e: any) {
      console.error("Critical Gemini Error:", e);
      // رد طارئ فقط عند فشل الاتصال الحقيقي بالسيرفر
      return "يا أهلاً بك يا غالي. يبدو أن هناك مشكلة بسيطة في الاتصال بالذكاء الاصطناعي. لكن كمهندس حيفان، أؤكد لك أن لدينا أفضل ألواح جينكو وبطاريات توبو بضمان حقيقي. هل يمكنني خدمتك في تفاصيل منظومة معينة؟";
    }
  }
}

export const geminiService = new GeminiService();
