
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
    <section className="relative rounded-[1.5rem] md:rounded-[3rem] overflow-hidden mb-12 md:mb-16 bg-[#061e23] min-h-[500px] md:min-h-[700px] flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 group py-12 md:py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1509391366360-fe5bb60213ad?q=80&w=2000&auto=format&fit=crop" 
          alt="حيفان للطاقة المتجددة" 
          className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061e23] via-[#061e23]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#061e23]/90 via-transparent to-transparent" />
      </div>

      {/* Professional Glowing Mesh Background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-emerald-500/20 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen animate-pulse pointer-events-none" />
      
      {/* رقعة الريادة في الزاوية اليمنى العليا */}
      <div className="absolute top-6 right-6 md:top-10 md:right-16 z-20">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full animate-fade-in shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <span className="relative flex h-2 w-2 md:h-3 md:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 text-[10px] md:text-xs font-black tracking-widest uppercase">الريادة في حلول الطاقة لعام 2026</span>
        </div>
      </div>

      <div className="relative container mx-auto px-4 md:px-16 z-10 text-right max-w-5xl mt-8">
        {/* Enhanced Title with improved line-height to fix clipping */}
        <div className="relative inline-block mb-4 md:mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-transparent blur-2xl rounded-full opacity-50" />
          
          <h1 className="relative text-3xl md:text-8xl font-black text-white leading-[1.3] md:leading-[1.2] animate-slide-up py-2">
            حيفان للطاقة <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 via-teal-300 to-emerald-400 bg-[length:200%_auto] animate-gradient-flow drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] px-1">
              نضيءُ مستقبلكَ
            </span> <br />
            بحلولٍ مستدامةٍ
          </h1>
        </div>
        
        <p className="text-gray-300 text-sm md:text-xl mb-8 md:mb-12 leading-relaxed max-w-2xl animate-slide-up [animation-delay:0.2s] font-medium opacity-90">
          اكتشفْ أفضلَ منظوماتِ الطاقةِ الشمسيةِ المصممةِ لتلبيةِ احتياجاتكَ، مع ضمانةٍ حقيقيةٍ وخدمةِ عملاءٍ متميزةٍ.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-start sm:justify-end animate-slide-up [animation-delay:0.4s] mb-12 md:mb-16">
          <button 
            onClick={scrollToProducts}
            className="group relative bg-emerald-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-[2rem] font-black shadow-2xl shadow-emerald-900/40 hover:bg-emerald-500 transition-all active:scale-95 overflow-hidden text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              تصفح المنتجات
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-2"><path d="m15 18-6-6 6-6"/></svg>
            </span>
          </button>
          
          <button 
            onClick={onOpenStory}
            className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-[2rem] font-black hover:bg-white/10 transition-all active:scale-95 hover:border-white/20 text-center"
          >
            قصة نجاحنا
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-2 md:gap-12 border-t border-white/10 pt-8 md:pt-10 animate-fade-in [animation-delay:0.6s]">
          <div className="group/stat">
            <div className="text-lg md:text-4xl font-black text-white group-hover/stat:text-emerald-400 transition-colors">+40 ألف</div>
            <div className="text-[8px] md:text-xs text-gray-400 font-black uppercase tracking-wider mt-1">عملاء سعداء</div>
          </div>
          <div className="group/stat border-x border-white/5 px-2 md:px-4">
            <div className="text-lg md:text-4xl font-black text-white group-hover/stat:text-emerald-400 transition-colors">25 سنة</div>
            <div className="text-[8px] md:text-xs text-gray-400 font-black uppercase tracking-wider mt-1">ضمان الأداء</div>
          </div>
          <div className="group/stat">
            <div className="text-lg md:text-4xl font-black text-white group-hover/stat:text-emerald-400 transition-colors">24/7</div>
            <div className="text-[8px] md:text-xs text-gray-400 font-black uppercase tracking-wider mt-1">دعم فني</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-slide-up { opacity: 0; animation: slide-up 0.8s ease-out forwards; }
        .animate-gradient-flow { animation: gradient-flow 6s ease infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
