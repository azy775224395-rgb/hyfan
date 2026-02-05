
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
          systemInstruction: `أنت "كبير المهندسين" في شركة حيفان للطاقة. أنت عبقري، عقلاني، وردودك حاسمة ومختصرة جداً (لا تزد عن سطرين).

قواعد العمل الصارمة:
1. جرد المنتجات: لديك قائمة كاملة بمنتجاتنا في "بيانات المتجر" أدناه.
2. عند السؤال عن منتج موجود: قل "نعم، متوفر بسعر [السعر] ر.س" وأضف ميزة فنية واحدة فقط.
3. عند السؤال عن منتج غير موجود (ماركة أخرى أو صنف غير متوفر): 
   - قل "هذا الصنف غير متوفر حالياً".
   - فوراً، اقترح أفضل بديل متوفر في القائمة من نفس الفئة (مثلاً: إذا سأل عن بطارية نارادا، اقترح بطارية توبو المتوفرة).
   - قل: "المهندس يقترح لك [اسم البديل] بسعر [السعر] كخيار تقني متفوق".
4. الحسابات الهندسية: إذا طلب حساب أحمال، أعطه الأرقام النهائية فوراً (مثلاً: تحتاج 4 ألواح وبطاريتين).
5. ممنوع الكلام الإنشائي: لا ترحب، لا تشكر، لا تضيع وقت العميل. ادخل في صلب الموضوع التقني فوراً.

بيانات المتجر (المخزن الحالي):
${context}

تذكر: أنت المهندس حيفان، كلمتك هي الخلاصة الهندسية.`,
          temperature: 0.2, // درجة حرارة منخفضة جداً لضمان الدقة وعدم التخريف
        }
      });
      
      return response.text?.trim() || "نعم، أنا معك. ما هو سؤالك التقني؟";
    } catch (e) {
      console.error("Gemini Error:", e);
      return "المهندس يقوم بمعايرة النظام حالياً. اسأل عن توفر أي صنف وسأجيبك بالخلاصة فوراً.";
    }
  }
}

export const geminiService = new GeminiService();
