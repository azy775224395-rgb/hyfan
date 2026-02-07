
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
    <section id="hero-section" className="relative md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-12 bg-[#061e23] min-h-[450px] md:min-h-[600px] flex items-center shadow-2xl border-b md:border border-white/5 group">
      {/* Background Image - Solar Theme - Optimized LCP */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop" 
          alt="ألواح طاقة شمسية حديثة في اليمن - حيفان للطاقة" 
          className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/50 to-emerald-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative container mx-auto px-4 md:px-12 z-10 text-right flex items-center">
        {/* Glass Box Container for Title */}
        <div className="max-w-3xl w-full bg-emerald-950/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl animate-slide-up relative overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 px-4 py-1.5 rounded-full text-[10px] md:text-sm font-black mb-6 animate-pulse shadow-lg w-fit">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              ✨ عروض حصرية لعام 2026 متوفرة الآن
            </div>
            
            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg">
              أفضل حلول <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-cyan-300">الطاقة الشمسية</span> <br/>
              بأقل الأسعار في اليمن
            </h1>
            
            <p className="text-gray-100 text-sm md:text-xl mb-8 leading-relaxed font-bold opacity-90 max-w-xl drop-shadow-md border-r-4 border-emerald-500 pr-4">
              تسوّق الآن أحدث الألواح والبطاريات والأجهزة المنزلية الموفرة للطاقة مع ضمان حقيقي وشحن لكافة المحافظات.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToProducts}
                className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-emerald-900/30 hover:bg-emerald-400 transition-all active:scale-95 text-sm md:text-lg border-2 border-emerald-400/20 flex-grow md:flex-grow-0 text-center"
              >
                تصفح المنتجات
              </button>
              <button 
                onClick={onOpenStory}
                className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all text-sm md:text-lg hover:border-white/40 flex-grow md:flex-grow-0 text-center"
              >
                عن حيفان
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
