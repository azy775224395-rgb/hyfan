
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="container mx-auto px-4 mb-24">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Expanded to full width (max-w-7xl) for horizontal rectangle look */}
      <div className="w-full bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-12 border border-emerald-50 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-100 blur-[60px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-emerald-700 font-black uppercase tracking-widest text-[9px] bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 inline-block mb-3">الدعم</span>
            <h2 className="text-xl md:text-3xl font-black text-emerald-950">الأسئلة الشائعة حول الطاقة الشمسية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`group border rounded-2xl transition-all duration-300 ${openIndex === index ? 'border-emerald-300 bg-white shadow-md' : 'border-emerald-50 bg-white/40 hover:bg-white hover:border-emerald-100'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-right outline-none h-full"
                  aria-expanded={openIndex === index}
                >
                  <h3 className={`font-black text-sm md:text-base transition-colors ${openIndex === index ? 'text-emerald-800' : 'text-emerald-950 group-hover:text-emerald-700'}`}>
                    {faq.question}
                  </h3>
                  <div className={`transition-all duration-300 p-1.5 rounded-lg flex-shrink-0 mr-3 ${openIndex === index ? 'rotate-180 bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-4 pb-4 pt-0 text-emerald-800/80 leading-relaxed text-xs md:text-sm border-t border-emerald-50/50 mt-1 font-medium">
                    <div className="pt-3">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
