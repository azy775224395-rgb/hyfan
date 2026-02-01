
import React, { useState } from 'react';

const FAQS = [
  {
    question: "ما هي أفضل أنواع البطاريات المتوفرة لديكم؟",
    answer: "نوفر بطاريات الليثيوم (LiFePO4) وبطاريات الجل. بطاريات الليثيوم هي الأفضل حالياً من حيث العمر الافتراضي الذي يصل إلى 10 سنوات وكفاءة الشحن السريع."
  },
  {
    question: "هل يتوفر لديكم شحن لجميع محافظات اليمن؟",
    answer: "نعم، نقوم بالشحن إلى صنعاء، تعز، عدن، إب، وكافة المحافظات الرئيسية عبر شركات النقل المعتمدة."
  },
  {
    question: "كيف أعرف حجم منظومة الطاقة التي أحتاجها لمنزلي؟",
    answer: "يمكنك التواصل مع مساعدنا الذكي هنا في الموقع أو مراسلتنا عبر واتساب لتزويدنا بقائمة الأجهزة التي تريد تشغيلها وسنقوم بحساب المنظومة المناسبة لك مجاناً."
  },
  {
    question: "هل توفرون ضمانة على الألواح والبطاريات؟",
    answer: "نعم، جميع منتجاتنا مضمونة. الألواح الشمسية تأتي بضمان أداء يصل إلى 25 سنة، والبطاريات تختلف ضماناتها بحسب النوع (ليثيوم أو جل)."
  }
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white rounded-[3rem] my-12 border border-emerald-50 shadow-sm overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs bg-emerald-50 px-4 py-1.5 rounded-full">المساعدة والدعم</span>
          <h2 className="text-3xl font-black text-gray-900 mt-4">الأسئلة الشائعة</h2>
          <p className="text-gray-500 mt-4">كل ما تحتاج معرفته عن خدماتنا ومنتجاتنا</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${openIndex === index ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100 bg-white'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-right outline-none"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-emerald-700' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-emerald-600' : 'text-gray-400'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-emerald-100/50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
