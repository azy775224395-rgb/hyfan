
import React from 'react';

interface StoryModalProps {
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-white flex flex-col animate-fade-in">
      <div className="container mx-auto px-6 py-12 md:py-24 max-w-5xl">
        <div className="flex items-center justify-between mb-16">
          <button 
            onClick={onClose} 
            className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all flex items-center gap-2 font-black shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
            إغلاق والعودة للمتجر
          </button>
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-emerald-950 mb-12 leading-tight">
          قصة نجاح <br/>
          <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-[12px]">حيفان للطاقة</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20">
          <div className="lg:col-span-2 space-y-10 text-gray-600 leading-relaxed text-xl md:text-2xl">
            <p className="font-medium">
              بدأت رحلة <strong>حيفان للطاقة المتجددة</strong> كحلم بسيط لتوفير حلول طاقة نظيفة ومستدامة في اليمن بأسعار في متناول الجميع.
            </p>
            <p className="font-medium">
              نحن فخورون بكوننا الوجهة الأولى لأكثر من <strong>40,000 عميل</strong> وثقوا بنا لإنارة منازلهم ومزارعهم. رؤيتنا هي أن لا ينطفئ أي منزل في اليمن.
            </p>
            <div className="bg-emerald-900 p-8 md:p-12 rounded-[2.5rem] border-r-[12px] border-emerald-500 font-bold text-white text-xl md:text-3xl shadow-2xl">
               "نحن لا نبيع مجرد ألواح شمسية، نحن نبيع الاستقرار والراحة لكل أسرة يمنية."
            </div>
          </div>
          
          <div className="bg-emerald-50/50 p-10 rounded-[3rem] border border-emerald-100 h-fit space-y-12">
            <div className="text-center">
               <div className="text-5xl font-black text-emerald-600 mb-2">+15 سنة</div>
               <div className="text-gray-400 font-black uppercase text-[10px]">خبرة في السوق اليمني</div>
            </div>
            <div className="text-center">
               <div className="text-5xl font-black text-emerald-600 mb-2">40K</div>
               <div className="text-gray-400 font-black uppercase text-[10px]">عميل سعيد واثق</div>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-20 w-full bg-emerald-950 text-white py-8 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-black transition-all"
        >
          تصفح المتجر الآن
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
