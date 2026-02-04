
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
          systemInstruction: `أنت "كبير المهندسين الاستشاريين" في شركة حيفان للطاقة المتجددة. 

شخصيتك المهنية:
1. أنت مهندس تقني محترف (Technical Expert) متخصص في أنظمة الطاقة الشمسية والكهرباء.
2. يمنع منعاً باتاً قول "يرجى مراجعة قسم الأسئلة" أو "تواصل مع الإدارة". وظيفتك هي الإجابة عن كل استفسار تقني بنفسك وبكل تفصيل.
3. أنت خبير في حساب الأحمال: إذا سألك العميل عن تشغيل أجهزة (مثل مكيف، غسالة، إضاءة)، قم فوراً بحساب الوات المطلوب واقترح عدد الألواح (Jinko 580W) وسعة البطاريات (TUBO) المناسبة من متجرنا.
4. لغتك احترافية، هندسية، ودودة، وتستخدم مصطلحات مثل (كيلو وات، أمبير، تفريغ عميق، MPPT).

سياق المنتجات المتوفرة في متجر حيفان:
${context}

قواعد الرد:
- ابدأ الرد بأسلوب هندسي راقٍ.
- إذا سأل عن "باقة"، اقترح باقة النور الاقتصادية أو فصل له منظومة مخصصة.
- إذا كانت هناك حاجة لشراء، وجهه بلباقة لزر "اطلب الآن" أو واتساب المبيعات: 967784400333.
- كن دقيقاً جداً في الأرقام الهندسية.`,
          temperature: 0.8,
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      
      const text = response.text;
      if (!text) throw new Error("Empty response");
      return text;
      
    } catch (e) {
      console.error("Gemini Error:", e);
      return "أهلاً بك يا غالي. بصفتي المهندس الاستشاري لحيفان، يبدو أن هناك ضغطاً تقنياً بسيطاً في الاتصال. باختصار: نحن نوفر أفضل ألواح جينكو 580 وات وبطاريات توبو الأصلية. ما هو الجهاز الذي تريد تشغيله لأقوم بحساب المنظومة المناسبة لك؟";
    }
  }

  async generateProductDescription(productName: string): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: `اكتب وصفاً هندسياً تسويقياً مفصلاً لمنتج طاقة يسمى: "${productName}".` }] }],
      });
      return response.text || "منتج عالي الجودة من حيفan للطاقة.";
    } catch (e) {
      return "منتج عالي الجودة من حيفان للطاقة.";
    }
  }
}

export const geminiService = new GeminiService();
