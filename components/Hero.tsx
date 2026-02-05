
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
    <section id="hero-section" className="relative md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-12 bg-[#061e23] min-h-[300px] md:min-h-[450px] flex items-center shadow-2xl border-b md:border border-white/5">
      {/* Background Image - Optimized for LCP */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1509391366360-fe5bb60213ad?q=60&w=1200&auto=format&fit=crop" 
          alt="متجر حيفان للطاقة" 
          className="w-full h-full object-cover opacity-40"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061e23] via-[#061e23]/40 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 z-10 text-right">
        <div className="max-w-3xl">
          <div className="inline-block bg-emerald-600/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] md:text-sm font-black mb-6 animate-pulse">
            عروض حصرية لعام 2026 متوفرة الآن
          </div>
          
          <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-6">
            أفضل حلول <span className="text-emerald-400">الطاقة الشمسية</span> <br/>
            بأقل الأسعار في اليمن
          </h1>
          
          <p className="text-gray-300 text-xs md:text-lg mb-8 leading-relaxed font-bold opacity-80 max-w-xl">
            تسوّق الآن أحدث الألواح والبطاريات والأجهزة المنزلية الموفرة للطاقة مع ضمان حقيقي وشحن لكافة المحافظات.
          </p>

          <div className="flex gap-4">
            <button 
              onClick={scrollToProducts}
              className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-emerald-500 transition-all active:scale-95 text-sm md:text-lg"
            >
              ابدأ التسوق الآن
            </button>
            <button 
              onClick={onOpenStory}
              className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all text-sm md:text-lg"
            >
              عن حيفان
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
