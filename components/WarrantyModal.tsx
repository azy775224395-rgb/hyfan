
import React from 'react';

interface WarrantyModalProps {
  onClose: () => void;
}

const WarrantyModal: React.FC<WarrantyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-gray-50 flex flex-col animate-fade-in">
      <div className="container mx-auto px-6 py-12 md:py-24 max-w-5xl">
        <div className="flex items-center justify-between mb-16">
          <button 
            onClick={onClose} 
            className="p-4 bg-white text-emerald-950 rounded-2xl hover:text-emerald-600 transition-all flex items-center gap-2 font-black shadow-sm border border-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
            إغلاق
          </button>
          <h1 className="text-2xl md:text-4xl font-black text-emerald-950">سياسة الضمان والجودة</h1>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
            <h3 className="text-2xl font-black text-emerald-950 mb-6 flex items-center gap-4">
              <span className="text-3xl">🛡️</span> ضمان الألواح والبطاريات
            </h3>
            <p className="text-gray-600 font-bold text-lg leading-relaxed">
              نقدم ضمانات حقيقية تصل إلى 25 سنة على كفاءة الألواح، وضمان استبدال لمدة سنة أو أكثر على البطاريات حسب النوع والموديل.
            </p>
          </section>

          <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
            <h3 className="text-2xl font-black text-emerald-950 mb-6 flex items-center gap-4">
              <span className="text-3xl">🚚</span> ضمان الشحن والتوصيل
            </h3>
            <p className="text-gray-600 font-bold text-lg leading-relaxed">
              نتحمل المسؤولية الكاملة عن وصول المنتج إليك سليماً. في حال حدوث أي كسر أثناء الشحن، يتم استبدال المنتج فوراً دون أي تكاليف إضافية.
            </p>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="mt-16 w-full bg-emerald-600 text-white py-6 rounded-2xl font-black text-xl shadow-xl hover:bg-emerald-700 transition-all"
        >
          حسناً، فهمت
        </button>
      </div>
    </div>
  );
};

export default WarrantyModal;
