
import React from 'react';

interface HeroProps {
  onOpenStory: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenStory }) => {
  const scrollToProducts = () => {
    const el = document.getElementById('products-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative md:rounded-[2.5rem] overflow-hidden mb-4 md:mb-10 bg-[#061e23] min-h-[400px] md:min-h-[600px] flex items-center shadow-2xl border-b md:border border-white/5 py-6 md:py-16">
      {/* Background Image - Optimized */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1509391366360-fe5bb60213ad?q=60&w=1200&auto=format&fit=crop" 
          alt="الطاقة المتجددة" 
          loading="eager"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061e23] via-[#061e23]/60 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 z-10 text-right max-w-5xl">
        <div className="mb-4">
          <h1 className="text-2xl md:text-7xl font-black text-white leading-tight animate-fade-in">
            حيفان للطاقة{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-teal-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
              المتجدّدة
            </span> <br />
            <span className="text-sm md:text-3xl opacity-80 font-bold">نحو عالمٍ مستدامٍ بطاقةٍ متجددةٍ</span>
          </h1>
        </div>
        
        <p className="text-gray-300 text-[11px] md:text-xl mb-6 md:mb-10 leading-relaxed max-w-xl font-medium">
          أفضل منظومات الطاقة الشمسية المصممة لليمن، مع ضمانة حقيقية وخدمة عملاء متميزة.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <button 
            onClick={scrollToProducts}
            className="bg-emerald-600 text-white px-6 py-3 md:px-10 md:py-5 rounded-xl font-black shadow-lg hover:bg-emerald-500 transition-all active:scale-95 text-[11px] md:text-lg"
          >
            تصفح المنتجات
          </button>
          
          <button 
            onClick={onOpenStory}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 md:px-10 md:py-5 rounded-xl font-black hover:bg-white/20 transition-all text-[11px] md:text-lg"
          >
            قصة نجاحنا
          </button>
        </div>

        {/* Simplified Stats */}
        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          <div>
            <div className="text-sm md:text-4xl font-black text-white">+40 ألف</div>
            <div className="text-[8px] md:text-xs text-gray-400 font-bold uppercase">عميل</div>
          </div>
          <div className="border-x border-white/5 px-2">
            <div className="text-sm md:text-4xl font-black text-white">25 سنة</div>
            <div className="text-[8px] md:text-xs text-gray-400 font-bold uppercase">ضمان</div>
          </div>
          <div>
            <div className="text-sm md:text-4xl font-black text-white">24/7</div>
            <div className="text-[8px] md:text-xs text-gray-400 font-bold uppercase">دعم</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
