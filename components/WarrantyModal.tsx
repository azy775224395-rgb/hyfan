
import React from 'react';

interface WarrantyModalProps {
  onClose: () => void;
}

const WarrantyModal: React.FC<WarrantyModalProps> = ({ onClose }) => {
  return (
    <div className="container mx-auto px-6 py-12 md:py-24 max-w-5xl animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
        <button 
          onClick={onClose} 
          className="p-5 bg-white text-emerald-950 rounded-2xl hover:text-emerald-600 transition-all flex items-center gap-3 font-black shadow-xl border border-gray-100 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
          العودة للتسوق
        </button>
        <div className="text-center md:text-right">
          <h1 className="text-4xl md:text-6xl font-black text-emerald-950">وثيقة الضمان</h1>
          <p className="text-emerald-600 font-bold text-lg mt-2">التزامنا تجاهك يمتد لسنوات</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 shadow-xl relative group hover:-translate-y-2 transition-transform">
          <div className="w-20 h-20 bg-emerald-600 text-white rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-lg group-hover:rotate-12 transition-transform">🛡️</div>
          <h3 className="text-2xl font-black text-emerald-950 mb-6 underline decoration-emerald-200 decoration-4">ضمان الألواح والبطاريات</h3>
          <p className="text-gray-500 font-bold text-lg leading-relaxed">
            جميع ألواحنا الشمسية (جينكو وسولار) تأتي بضمان أداء حقيقي يصل لـ 25 سنة. أما بطاريات توبو وغيرها، فنحن الوكيل الوحيد الذي يقدم ضمان استبدال فوري يصل لسنة كاملة في حال وجود عيب مصنعي.
          </p>
        </section>

        <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 shadow-xl relative group hover:-translate-y-2 transition-transform">
          <div className="w-20 h-20 bg-amber-500 text-white rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-lg group-hover:rotate-12 transition-transform">🚚</div>
          <h3 className="text-2xl font-black text-emerald-950 mb-6 underline decoration-amber-200 decoration-4">ضمان الشحن والتوصيل</h3>
          <p className="text-gray-500 font-bold text-lg leading-relaxed">
            هل تخشى الكسر؟ لا تقلق. أبو إيفان للطاقة المتجددة تتحمل المسؤولية الكاملة عن المنتج حتى يصل لباب منزلك. في حال وصول أي لوح مكسور أو جهاز متضرر، نقوم بشحن بديل فوراً على حسابنا الخاص دون أي أسئلة.
          </p>
        </section>

        <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 shadow-xl relative group hover:-translate-y-2 transition-transform md:col-span-2">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-lg group-hover:rotate-12 transition-transform">🔧</div>
          <h3 className="text-2xl font-black text-emerald-950 mb-6 underline decoration-blue-200 decoration-4">الدعم الفني والتركيب</h3>
          <p className="text-gray-500 font-bold text-lg leading-relaxed">
            فريقنا الهندسي متاح دائماً لاستقبال استفساراتكم. الضمان يشمل أيضاً دعماً فنياً مجانياً لبرمجة الإنفرترات وضبط إعدادات الشحن لضمان أطول عمر ممكن لمنظومتك.
          </p>
        </section>
      </div>

      <div className="mt-20 p-10 md:p-16 bg-emerald-50 rounded-[3.5rem] text-center border-4 border-dashed border-emerald-200">
        <h3 className="text-2xl font-black text-emerald-900 mb-4">هل لديك استفسار عن الضمان؟</h3>
        <p className="text-emerald-700/60 font-bold mb-8">فريق خدمة العملاء متاح 24/7 عبر الواتساب للإجابة عن كل أسئلتكم.</p>
        <button 
          onClick={() => {
            const link = document.createElement('a');
            link.href = "https://wa.me/967784400333";
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }} 
          className="inline-block bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all active:scale-95"
        >
          تحدث مع المبيعات الآن
        </button>
      </div>
    </div>
  );
};

export default WarrantyModal;
