
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  private getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key is missing");
    return new GoogleGenAI({ apiKey });
  }

  async chatWithCustomer(history: ChatMessage[], inventoryData: string): Promise<string> {
    try {
      const ai = this.getClient();
      
      // تنسيق السجل ليتوافق مع هيكلية Gemini (user vs model)
      const contents = history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // استخدام نسخة البرو للتحليل الهندي
        contents: contents,
        config: {
          systemInstruction: `أنت "المهندس أبو طاقة"، الخبير التقني والمستشار الهندسي لمتجر حيفان للطاقة المتجددة في اليمن (2026).

قاعدة المعرفة الخاصة بك (المخزون المتوفر الآن في المتجر):
${inventoryData}

تعليمات العمل الهندسية:
1. الشخصية: أنت مهندس يمني خبير، ناصح، وودود جداً. استخدم مصطلحات يمنية محببة (يا غالي، نورتنا، من عيوني، مصلحتك أولاً).
2. الذاكرة: تذكر دائماً ما قاله العميل سابقاً في هذه الجلسة. إذا سأل عن "السعر" يقصد آخر منتج تحدثتما عنه.
3. التحليل الهندسي: 
   - لا تعطِ إجابات عشوائية. إذا سأل العميل عن تشغيل أجهزة، احسب الوات (W) واقترح البطارية والإنفرتر المناسب من "قاعدة المعرفة" أعلاه حصراً.
   - اشرح للعميل لماذا اخترت له هذا المنتج (مثلاً: "اخترت لك بطارية توبو 200 أمبير لأن سحبك عالي وتتحمل التفريغ").
4. الروابط: عند ذكر منتج، يفضل وضع الرابط الداخلي له بالصيغة: /#product-[ID]
5. القيود: لا تقترح أبداً منتجات غير موجودة في "قاعدة المعرفة" أعلاه. إذا لم تجد طلباً معيناً، قل للعميل أنك ستبحث له عن بديل مناسب من المخزون المتوفر.

تذكر: أنت لست مجرد بوت دردشة، أنت مهندس مبيعات محترف هدفه بناء منظومة طاقة آمنة ومستدامة للبيت اليمني.`,
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
        }
      });
      
      return response.text || "أهلاً بك يا غالي. أنا المهندس، كيف أقدر أصمم لك منظومتك اليوم؟";
    } catch (e: any) {
      console.error("Gemini Engine Error:", e);
      // معالجة الخطأ برسالة أكثر ذكاءً بدلاً من رسالة الفشل الثابتة
      return "نعتذر منك يا غالي، يبدو أن هناك ضغط على السيرفرات حالياً. لكن كمهندس، أنصحك دائماً بألواح جينكو وبطاريات توبو المتوفرة عندنا لضمان أفضل أداء. تقدر تكرر سؤالك؟";
    }
  }
}

export const geminiService = new GeminiService();
