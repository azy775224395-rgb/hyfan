
import React from 'react';

interface StoryModalProps {
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-emerald-50 min-h-[70vh] animate-fade-in relative">
      {/* Back Button */}
      <button 
        onClick={onClose} 
        className="absolute top-10 left-10 z-10 bg-gray-50 p-4 rounded-2xl hover:bg-emerald-100 hover:text-emerald-600 transition-all flex items-center gap-2 font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        العودة
      </button>

      <div className="p-10 md:p-24 max-w-4xl mx-auto">
        <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white mb-12 shadow-xl shadow-emerald-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>

        <h2 className="text-5xl font-black text-gray-900 mb-8">قصة نجاح حيفان</h2>
        
        <div className="space-y-8 text-gray-600 leading-relaxed text-xl">
          <p>
            بدأت رحلة <strong>حيفان للطاقة المتجددة</strong> كحلم بسيط في قلب اليمن لتوفير حلول طاقة نظيفة ومستدامة في وقت كانت فيه البلاد بأمس الحاجة للبدائل.
          </p>
          <p>
            منذ تأسيسنا، وضعنا نصب أعيننا هدفاً واحداً: <strong>أن لا ينطفئ منزل في اليمن</strong>. بدأنا ببيع أول لوح شمسي في عام 2010، واليوم في مطلع عام <strong>2026</strong>، نحن فخورون بكوننا الوجهة الأولى لأكثر من <strong>40,000 عميل</strong> وثقوا بنا لإنارة منازلهم ومزارعهم ومنشآتهم.
          </p>
          <div className="bg-emerald-50 p-10 rounded-[2.5rem] border-r-8 border-emerald-600 font-bold text-emerald-900 text-2xl shadow-sm">
            رؤيتنا لعام 2026 هي التحول الكامل نحو أنظمة الليثيوم الذكية وتوفير طاقة مجانية لكل بيت يمني بأعلى معايير الجودة العالمية.
          </div>
          <p>
            شكراً لكونكم جزءاً من قصتنا. معكم نضيء اليمن، ومعكم نستمر في العطاء. نحن في حيفان للطاقة لا نبيع مجرد منتجات، بل نقدم حلولاً تضمن لكم راحة البال واستمرارية الحياة.
          </p>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-100 flex flex-col md:flex-row gap-12 items-center justify-between">
           <div className="text-center">
              <div className="text-4xl font-black text-emerald-600 mb-2">+15 سنة</div>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">خبرة في السوق</div>
           </div>
           <div className="text-center">
              <div className="text-4xl font-black text-emerald-600 mb-2">40K</div>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">عميل واثق</div>
           </div>
           <div className="text-center">
              <div className="text-4xl font-black text-emerald-600 mb-2">2026</div>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">عام التحول الذكي</div>
           </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-16 w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
        >
          العودة لتصفح المنتجات
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
