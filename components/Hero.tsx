
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
    <section className="relative rounded-2xl md:rounded-[3rem] overflow-hidden mb-8 md:mb-16 bg-[#061e23] min-h-[550px] md:min-h-[700px] flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 group py-12 md:py-24">
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
      
      {/* وسام الريادة في الزاوية اليمنى العليا - مع وضع ثابت وأنيق */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-20">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/40 px-4 py-2 md:px-6 md:py-3 rounded-full animate-fade-in shadow-[0_0_30px_rgba(16,185,129,0.4)]">
          <span className="relative flex h-3 w-3 md:h-4 md:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-emerald-500"></span>
          </span>
          <span className="text-white text-[10px] md:text-sm font-black tracking-widest uppercase">الريادة في حلول الطاقة 2026</span>
        </div>
      </div>

      <div className="relative container mx-auto px-4 md:px-16 z-10 text-right max-w-5xl mt-8 md:mt-0">
        {/* العنوان الرئيسي مع تحسين الارتفاع لمنع الاقتطاع */}
        <div className="relative inline-block mb-6">
          <h1 className="relative text-4xl md:text-8xl font-black text-white leading-[1.6] md:leading-[1.4] animate-slide-up py-4">
            حيفان للطاقة <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 via-teal-300 to-emerald-400 bg-[length:200%_auto] animate-gradient-flow drop-shadow-[0_0_20px_rgba(52,211,153,0.5)] px-2">
              نضيءُ مستقبلكَ
            </span> <br />
            بحلولٍ مستدامةٍ
          </h1>
        </div>
        
        <p className="text-gray-300 text-sm md:text-2xl mb-8 md:mb-12 leading-relaxed max-w-2xl animate-slide-up [animation-delay:0.2s] font-medium opacity-90">
          اكتشفْ أفضلَ منظوماتِ الطاقةِ الشمسيةِ المصممةِ لتلبيةِ احتياجاتكَ، مع ضمانةٍ حقيقيةٍ وخدمةِ عملاءٍ متميزةٍ في اليمن.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-start sm:justify-end animate-slide-up [animation-delay:0.4s] mb-12 md:mb-16">
          <button 
            onClick={scrollToProducts}
            className="group relative bg-emerald-600 text-white px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-[2rem] font-black shadow-2xl shadow-emerald-900/40 hover:bg-emerald-500 transition-all active:scale-95 overflow-hidden text-center text-sm md:text-xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              ابدأ التصفح الآن
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-2"><path d="m15 18-6-6 6-6"/></svg>
            </span>
          </button>
          
          <button 
            onClick={onOpenStory}
            className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-[2rem] font-black hover:bg-white/20 transition-all active:scale-95 text-center text-sm md:text-xl"
          >
            قصة نجاحنا
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 md:gap-16 border-t border-white/10 pt-10 animate-fade-in [animation-delay:0.6s]">
          <div className="group/stat">
            <div className="text-xl md:text-5xl font-black text-white group-hover/stat:text-emerald-400 transition-colors">+40 ألف</div>
            <div className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-wider mt-2">عميل واثق</div>
          </div>
          <div className="group/stat border-x border-white/5 px-4 md:px-8">
            <div className="text-xl md:text-5xl font-black text-white group-hover/stat:text-emerald-400 transition-colors">25 سنة</div>
            <div className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-wider mt-2">ضمان الأداء</div>
          </div>
          <div className="group/stat">
            <div className="text-xl md:text-5xl font-black text-white group-hover/stat:text-emerald-400 transition-colors">24/7</div>
            <div className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-wider mt-2">دعم تقني</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-slide-up { opacity: 0; animation: slide-up 1s ease-out forwards; }
        .animate-gradient-flow { animation: gradient-flow 5s ease infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
