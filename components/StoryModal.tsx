
import React from 'react';

interface StoryModalProps {
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ onClose }) => {
  return (
    <div className="container mx-auto px-6 py-12 md:py-24 max-w-6xl animate-fade-in">
      <div className="flex items-center justify-between mb-16">
        <button 
          onClick={onClose} 
          className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all flex items-center gap-3 font-black shadow-sm active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
          العودة للمتجر
        </button>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">قصة ريادة</p>
            <p className="font-black text-emerald-950">حيفان للطاقة</p>
          </div>
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h1 className="text-5xl md:text-8xl font-black text-emerald-950 mb-12 leading-[1.1]">
            نضيء <span className="text-emerald-600 italic">اليمن</span> <br/>
            بأفضل الحلول
          </h1>
          <div className="space-y-8 text-gray-600 leading-relaxed text-xl md:text-2xl">
            <p className="font-bold">
              بدأت رحلة حيفان للطاقة المتجددة في السوق اليمني، حاملين مهمة واحدة: إنهاء معاناة الظلام عبر حلول طاقة نظيفة واقتصادية بمواصفات عالمية.
            </p>
            <p className="font-medium opacity-80">
              اليوم، وبفضل ثقة أكثر من 40,000 عميل، أصبحنا الاسم الأول في توريد ألواح جينكو وبطاريات توبو في جميع المحافظات، من المهرة إلى صعدة.
            </p>
            <div className="bg-emerald-900 p-10 md:p-14 rounded-[3.5rem] border-r-[15px] border-emerald-500 font-black text-white text-2xl md:text-4xl shadow-3xl transform -rotate-1 hover:rotate-0 transition-transform">
               "الجودة ليست خياراً عندنا، بل هي أمانة نؤديها لكل بيت يمني."
            </div>
          </div>
        </div>

        <div className="relative group">
           <div className="absolute -inset-4 bg-emerald-100 rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
           <div className="relative bg-white p-12 md:p-20 rounded-[4rem] border border-emerald-50 shadow-2xl space-y-16">
              <div className="flex items-center gap-8">
                <div className="text-7xl font-black text-emerald-600">+15</div>
                <div>
                  <p className="text-2xl font-black text-emerald-950">سنة خبرة</p>
                  <p className="text-gray-400 font-bold">في السوق اليمني المحلي</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-7xl font-black text-emerald-600">40K</div>
                <div>
                  <p className="text-2xl font-black text-emerald-950">عميل واثق</p>
                  <p className="text-gray-400 font-bold">يستخدمون حلولنا يومياً</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-7xl font-black text-emerald-600">22</div>
                <div>
                  <p className="text-2xl font-black text-emerald-950">محافظة ومديرية</p>
                  <p className="text-gray-400 font-bold">تغطيها شبكة شحن حيفان</p>
                </div>
              </div>
           </div>
        </div>
      </div>
      
      <button 
        onClick={onClose}
        className="mt-24 w-full bg-emerald-950 text-white py-10 rounded-[2.5rem] font-black text-3xl shadow-3xl hover:bg-black transition-all active:scale-[0.98]"
      >
        ابدأ رحلتك مع الطاقة النظيفة الآن
      </button>
    </div>
  );
};

export default StoryModal;
