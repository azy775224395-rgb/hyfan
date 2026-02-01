
import React from 'react';

interface WarrantyModalProps {
  onClose: () => void;
}

const WarrantyModal: React.FC<WarrantyModalProps> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-emerald-50 min-h-[70vh] animate-fade-in relative">
      {/* Back Button */}
      <button 
        onClick={onClose} 
        className="absolute top-10 left-10 z-10 bg-gray-50 p-4 rounded-2xl hover:bg-emerald-100 hover:text-emerald-600 transition-all flex items-center gap-2 font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        العودة للرئيسية
      </button>

      <div className="p-8 md:p-24 max-w-4xl mx-auto">
        <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white mb-12 shadow-xl shadow-emerald-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>

        <h2 className="text-5xl font-black text-gray-900 mb-12">سياسة الضمان والجودة</h2>
        
        <div className="space-y-12">
          <section className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
            <h3 className="text-2xl font-black text-emerald-600 mb-6 flex items-center gap-4">
              <span className="w-3 h-3 bg-emerald-600 rounded-full"></span>
              ضمان الألواح الشمسية
            </h3>
            <ul className="list-disc list-inside space-y-4 text-gray-600 font-bold text-lg mr-4">
              <li>ضمان أداء يصل إلى <span className="text-emerald-700">25 سنة</span> (انخفاض الكفاءة لا يتجاوز 20% خلال هذه الفترة).</li>
              <li>ضمان ضد العيوب المصنعية لمدة 12 سنة كاملة.</li>
              <li>تغطية استبدال فورية في حالة وجود خلل في الخلايا الضوئية.</li>
            </ul>
          </section>

          <section className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
            <h3 className="text-2xl font-black text-emerald-600 mb-6 flex items-center gap-4">
              <span className="w-3 h-3 bg-emerald-600 rounded-full"></span>
              ضمان البطاريات
            </h3>
            <ul className="list-disc list-inside space-y-4 text-gray-600 font-bold text-lg mr-4">
              <li><strong>بطاريات الليثيوم (LiFePO4):</strong> ضمان استبدال حقيقي لمدة 5 سنوات.</li>
              <li><strong>بطاريات الجل والكربون:</strong> ضمان لمدة سنة واحدة ضد العيوب المصنعية.</li>
              <li>خدمة صيانة دورية مجانية خلال السنة الأولى.</li>
            </ul>
          </section>

          <section className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
            <h3 className="text-2xl font-black text-emerald-600 mb-6 flex items-center gap-4">
              <span className="w-3 h-3 bg-emerald-600 rounded-full"></span>
              ضمان الإنفرترات والهجين
            </h3>
            <ul className="list-disc list-inside space-y-4 text-gray-600 font-bold text-lg mr-4">
              <li>ضمان لمدة <strong>سنتين</strong> على كافة أجهزة الإنفرتر الهجين (Growatt / Voltronic).</li>
              <li>توفير قطع غيار أصلية بأسعار مخفضة بعد فترة الضمان.</li>
              <li>تحديثات برمجية مجانية لتحسين كفاءة استهلاك الطاقة.</li>
            </ul>
          </section>

          <div className="bg-amber-50 border-r-8 border-amber-500 p-10 rounded-[2.5rem] shadow-sm">
            <h4 className="text-amber-900 font-black text-xl mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              تنبيهات هامة حول سريان الضمان:
            </h4>
            <p className="text-amber-800 text-lg leading-relaxed font-bold">
              يسقط الضمان تلقائياً في حالات: سوء الاستخدام المتعمد، التعرض للصواعق الرعدية دون تركيب نظام حماية معتمد، العبث بالجهاز من قبل فني غير مختص من قبلنا، أو تعرض المنتج للكسر أو الحريق الناتج عن حادث عرضي خارجي.
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-16 w-full bg-gray-900 text-white py-6 rounded-[2rem] font-black text-xl shadow-xl hover:bg-emerald-600 transition-all active:scale-95"
        >
          فهمت سياسة الضمان
        </button>
      </div>
    </div>
  );
};

export default WarrantyModal;
