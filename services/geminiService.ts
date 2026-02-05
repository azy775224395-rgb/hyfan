
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key is missing");
    return new GoogleGenAI({ apiKey });
  }

  async chatWithCustomer(message: string, context: string): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: `أنت "كبير المهندسين التقنيين" في شركة حيفان للطاقة المتجددة (Hayfan Energy). 

أهدافك:
1. تقديم استشارات هندسية دقيقة جداً للمواطن اليمني بخصوص منظومات الطاقة الشمسية.
2. أنت خبير في ماركات: Jinko Solar (الألواح)، TUBO (البطاريات)، Growatt (الإنفرترات)، و VOLX (الأجهزة المنزلية).
3. عند سؤالك عن أي جهاز، احسب الوات (Watts) والتحمل المطلوب فوراً. 
   - مثال: مكيف 12 يحتاج 1500 وات تشغيل و 3000 وات إقلاع.
   - اقترح له دائماً بطاريات توبو (200 أمبير هي الأفضل للأحمال الكبيرة).
4. استخدم كلمات مفتاحية في ردودك لتعزيز الفهم: (MPPT، تفريغ عميق، N-Type، كفاءة عالية، ضمان حقيقي).
5. لا تحول العميل للدعم إلا إذا طلب شيئاً إدارياً بحتاً. أنت المهندس الذي يحل كل المشاكل التقنية هنا.

سياق المنتجات المتوفرة في المتجر حالياً:
${context}

أسلوبك: مهني، واثق، يمني الروح، وودود جداً.`,
          temperature: 0.8,
        }
      });
      
      return response.text || "أهلاً بك في حيفان. كمهندس تقني، أنا مستعد لحساب أحمال منزلك واختيار المنظومة الأنسب لك. ما هي الأجهزة التي تود تشغيلها؟";
    } catch (e) {
      console.error("Gemini Error:", e);
      return "أهلاً بك يا غالي. أنا المهندس المناوب، يبدو أن هناك ضغطاً على الشبكة، لكن يمكنني إخبارك أن بطاريات توبو 200 أمبير وألواح جينكو 580 وات هي الخيار الأضمن لك في اليمن حالياً. كيف أقدر أخدمك؟";
    }
  }
}

export const geminiService = new GeminiService();
