
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
      className="relative overflow-hidden mb-0 bg-white min-h-[350px] md:min-h-[500px] flex items-center"
    >
      {/* Attractive Background Pattern or Gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 w-2/3 h-full bg-primary/5 rounded-l-[100px] -mr-32 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-6 md:px-12 z-10 w-full">
        <div className="flex flex-col items-center justify-center text-center py-12">
          
          {/* Text Content */}
          <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 shadow-sm border border-primary/20"
              >
                <Sun size={14} className="text-accent" />
                حلول طاقة مستدامة لبناء المستقبل
              </div>
              
              <h1 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                قوة ذكية <br/>
                <span className="text-primary">لحياة أفضل</span> باليمن
              </h1>
              
              <p className="text-slate-600 text-sm md:text-xl mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
                نقدم لكم أفضل المنظومات الشمسية المتكاملة، البطاريات عالية الجودة، والأجهزة المنزلية الموفرة للطاقة مع خدمات التركيب والصيانة.
              </p>

              <div className="flex flex-wrap justify-center gap-4 w-full md:w-auto">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProducts}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-secondary transition-all text-sm md:text-lg flex-1 md:flex-none text-center"
                >
                  تسوّق الآن
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenStory}
                  className="bg-white text-primary border-2 border-primary/20 px-8 py-4 rounded-xl font-bold hover:bg-primary/5 transition-all text-sm md:text-lg flex-1 md:flex-none text-center"
                >
                  من نحن
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Graphic / Highlight Image Removed */}

        </div>
      </div>
    </section>
  );
};

export default Hero;
