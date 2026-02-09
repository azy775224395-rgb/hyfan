
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sun } from 'lucide-react';
import OptimizedImage from './ui/OptimizedImage';

interface HeroProps {
  onOpenStory: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenStory }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    const el = document.getElementById('products-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref} 
      id="hero-section" 
      // Ensure mb-0 is strictly applied and no border at bottom creates visual gap
      className="relative md:rounded-b-[2.5rem] md:rounded-t-none overflow-hidden mb-0 bg-[#061e23] min-h-[400px] md:min-h-[550px] flex items-center shadow-lg group"
    >
      {/* Background Image - Optimized */}
      <div className="absolute inset-0 overflow-hidden">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop" 
          alt="ألواح طاقة شمسية حديثة في اليمن - حيفان للطاقة" 
          className="w-full h-full object-cover" 
          priority={true}
          wrapperClassName="w-full h-full"
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Right Column: Text Content */}
          <div className="text-right flex flex-col items-start order-2 md:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="inline-flex items-center gap-2 bg-emerald-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-bold mb-4 shadow-sm"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                عروض حصرية لعام 2026
              </div>
              
              <h1 className="text-2xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-md">
                أفضل حلول <span className="text-emerald-400">الطاقة الشمسية</span> <br/>
                بأقل الأسعار في اليمن
              </h1>
              
              <p className="text-gray-200 text-xs md:text-lg mb-8 leading-relaxed font-medium max-w-lg drop-shadow-sm">
                تسوّق الآن أحدث الألواح والبطاريات والأجهزة المنزلية الموفرة للطاقة مع ضمان حقيقي وشحن لكافة المحافظات.
              </p>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProducts}
                  className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-black shadow-lg shadow-emerald-900/20 hover:bg-emerald-400 transition-colors text-xs md:text-base flex-1 md:flex-none text-center"
                >
                  تصفح المنتجات
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenStory}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-xl font-black hover:bg-white/20 transition-colors text-xs md:text-base flex-1 md:flex-none text-center"
                >
                  عن حيفان
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Left Column: Trust Badge Graphic */}
          <div className="hidden md:flex justify-end items-center order-1 md:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl flex flex-col items-center text-center max-w-xs"
            >
              <div className="relative mb-4">
                <ShieldCheck size={64} className="text-emerald-400" strokeWidth={1.5} />
                <Sun size={24} className="text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-yellow-400 animate-pulse" />
              </div>
              <h3 className="text-white font-black text-lg mb-1">ضمان حقيقي</h3>
              <p className="text-emerald-100 text-xs font-bold">وشحن سريع لجميع المحافظات</p>
              
              {/* Decorative glows */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
