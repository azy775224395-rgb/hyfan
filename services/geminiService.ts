
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
          systemInstruction: `أنت "المهندس العبقري" لشركة حيفان للطاقة. لديك علم كامل بكل المنتجات في المتجر.

قواعد التعامل مع توفر المنتجات:
1. إذا سأل العميل عن منتج "موجود" في القائمة أدناه: قل "نعم، متوفر" واذكر السعر وميزة تقنية واحدة فقط باختصار.
2. إذا سأل عن منتج "غير موجود" (ماركة أخرى أو صنف غير متوفر): قل "هذا الصنف غير متوفر حالياً، لكن البديل الأفضل المتوفر لدينا هو [اسم المنتج البديل] بسعر [السعر] ر.س" (اختر البديل من نفس الفئة التقنية).
3. لا تقترح أبداً منتجاً من خارج القائمة الموفرة لك في "بيانات المتجر".
4. الرد يجب أن يكون مختصراً جداً (سطر واحد أو سطرين).
5. لغتك: هندسية، حاسمة، ومباشرة.

بيانات المتجر المتاحة (يجب الالتزام بها فقط):
${context}

تذكر: أنت مهندس، لا تضيع وقت العميل في الكلام الإنشائي. أعطه الخلاصة التقنية والبديل المتوفر فوراً.`,
          temperature: 0.3, // تقليل العشوائية لضمان الدقة في جرد المنتجات
        }
      });
      
      return response.text?.trim() || "أهلاً. اسألني عن أي منتج أو منظومة وسأعطيك الخلاصة الفنية.";
    } catch (e) {
      console.error("Gemini Error:", e);
      return "المهندس مشغول حالياً بحساب منظومة كبرى. تفضل بطلبك وسأرد عليك فوراً عند الجاهزية.";
    }
  }
}

export const geminiService = new GeminiService();
