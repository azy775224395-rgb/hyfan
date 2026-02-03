
import React, { useState } from 'react';

const FAQS = [
  {
    question: "ما هي أفضل أنواع البطاريات المتوفرة لديكم؟",
    answer: "نوفر بطاريات الليثيوم (LiFePO4) وبطاريات الجل. بطاريات الليثيوم هي الأفضل حالياً من حيث العمر الافتراضي الذي يصل إلى 10 سنوات وكفاءة الشحن السريع."
  },
  {
    question: "هل يتوفر لديكم شحن لجميع محافظات اليمن؟",
    answer: "نعم، نقوم بالشحن إلى صنعاء، تعز، عدن، إب، وكافة المحافظات الرئيسية عبر شركات النقل المعتمدة بأسعار رمزية وتغليف آمن."
  },
  {
    question: "كيف أعرف حجم منظومة الطاقة التي أحتاجها لمنزلي؟",
    answer: "يمكنك استخدام حاسبة الطاقة الذكية المتوفرة في موقعنا، أو التواصل مع مساعدنا الذكي. كما يمكنك مراسلتنا عبر واتساب لتزويدنا بقائمة الأجهزة وسنقوم بالحساب لك مجاناً."
  },
  {
    question: "هل توفرون ضمانة حقيقية على الألواح والبطاريات؟",
    answer: "نعم، جميع منتجاتنا مضمونة بضمانات استبدال أو صيانة. الألواح تأتي بضمان أداء يصل لـ 25 سنة، والبطاريات الليثيوم بضمان 5 سنوات."
  }
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 bg-white/60 backdrop-blur-2xl rounded-[3rem] my-12 border border-emerald-50 shadow-2xl shadow-emerald-900/5 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100 blur-[120px] pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-emerald-700 font-black uppercase tracking-widest text-[10px] bg-emerald-100 px-6 py-2 rounded-full border border-emerald-200 inline-block mb-6">المساعدة والدعم</span>
          <h2 className="text-3xl md:text-5xl font-black text-emerald-950 leading-tight">الأسئلة الشائعة</h2>
          <p className="text-emerald-800/50 mt-6 font-bold text-base md:text-lg">كل ما تحتاج معرفته عن خدماتنا ومنتجاتنا لعام 2026</p>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`group border rounded-3xl transition-all duration-300 ${openIndex === index ? 'border-emerald-300 bg-white shadow-xl translate-x-1' : 'border-emerald-50 bg-white/40 hover:bg-white hover:border-emerald-100'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-right outline-none"
              >
                <span className={`font-black text-base md:text-xl transition-colors ${openIndex === index ? 'text-emerald-800' : 'text-emerald-950 group-hover:text-emerald-700'}`}>
                  {faq.question}
                </span>
                <div className={`transition-all duration-300 p-2 rounded-xl flex-shrink-0 mr-4 ${openIndex === index ? 'rotate-180 bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-300'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 md:px-8 pb-8 pt-0 text-emerald-800/70 leading-relaxed text-sm md:text-lg border-t border-emerald-50/50 mt-2 font-medium">
                  <div className="py-4">
                    {faq.answer}
                  </div>
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
