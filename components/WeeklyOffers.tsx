
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Timer, Zap, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import OptimizedImage from './ui/OptimizedImage';

interface WeeklyOffersProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const WeeklyOffers: React.FC<WeeklyOffersProps> = ({ products, onAddToCart, onViewDetails, formatPrice }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // 1. Calculate Week Number to use as a Seed
  const currentWeekSeed = useMemo(() => {
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    return weekNumber + now.getFullYear(); // Unique seed per week per year
  }, []);

  // 2. Shuffle products deterministically based on the seed
  const weeklyProducts = useMemo(() => {
    if (products.length === 0) return [];
    
    // Create a copy
    let shuffled = [...products];
    
    // Simple seeded random function
    const seededRandom = (seed: number) => {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // Fisher-Yates shuffle with seeded random
    let m = shuffled.length, t, i;
    let seed = currentWeekSeed;
    while (m) {
      i = Math.floor(seededRandom(seed) * m--);
      t = shuffled[m];
      shuffled[m] = shuffled[i];
      shuffled[i] = t;
      seed++;
    }

    // Return top 8 to ensure scrolling content
    return shuffled.slice(0, 8);
  }, [products, currentWeekSeed]);

  // 3. Countdown Timer Logic (Until next Friday midnight)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Calculate next Friday (Islamic weekend usually implies offers end) or End of Week (Sunday)
      // Let's set it to end of current week (next Saturday 00:00)
      const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
      const daysUntilNextSat = (6 - dayOfWeek + 7) % 7; 
      
      const nextEnd = new Date(now);
      nextEnd.setDate(now.getDate() + daysUntilNextSat);
      nextEnd.setHours(23, 59, 59, 999);

      const difference = nextEnd.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        return `${days}ي ${hours}س ${minutes}د`;
      }
      return "انتهى العرض";
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    setTimeLeft(calculateTimeLeft()); // Initial call

    return () => clearInterval(timer);
  }, []);

  // 4. Auto Scroll Logic (Every 2 seconds)
  useEffect(() => {
    if (isPaused || weeklyProducts.length === 0) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        
        // Calculate the width of one card plus gap
        // We assume the first child exists if weeklyProducts > 0
        const itemWidth = container.children[0]?.clientWidth || 280;
        const gap = 16; // gap-4 is 1rem = 16px
        const scrollAmount = itemWidth + gap;

        // Check if we reached the end
        // scrollWidth: total width of content
        // clientWidth: visible width
        // scrollLeft: current position
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // If we are close to the end (within small tolerance), loop back to start smoothly
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll forward
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 2000); // 2000ms = 2 Seconds

    return () => clearInterval(interval);
  }, [isPaused, weeklyProducts]);

  if (weeklyProducts.length === 0) return null;

  return (
    <section className="container mx-auto px-4 mt-8 mb-4">
      <div 
        className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-[2rem] p-6 md:p-8 relative overflow-hidden shadow-xl border border-emerald-800"
        // Pause handlers for container
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        // Add a small delay on touch end before resuming to prevent instant jumping
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
      >
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded animate-pulse">
                LIMITED TIME
              </span>
              <span className="text-emerald-300 text-xs font-bold tracking-wider">الأسبوع #{currentWeekSeed % 52}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <Zap className="text-yellow-400 fill-yellow-400" />
              عروض الأسبوع
            </h2>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2">
            <Timer className="text-emerald-300" size={20} />
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-300 font-bold uppercase">ينتهي خلال</span>
              <span className="text-white font-mono font-black text-sm md:text-base dir-ltr">{timeLeft}</span>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative z-10">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 transition-all"
            style={{ 
              scrollBehavior: 'smooth', 
              WebkitOverflowScrolling: 'touch' // Ensures smooth momentum scrolling on iOS
            }}
          >
            {weeklyProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewDetails(product)}
                className="snap-center shrink-0 w-[240px] md:w-[280px] bg-white rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-white/10 hover:shadow-emerald-500/20 transition-all flex-none"
              >
                {/* Image */}
                <div className="relative h-40 bg-gray-50 p-4">
                   <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full z-10 shadow-sm">
                     خصم خاص
                   </div>
                   <OptimizedImage 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                   />
                </div>

                {/* Info */}
                <div className="p-4">
                   <h3 className="text-emerald-950 font-black text-sm truncate mb-1">{product.name}</h3>
                   <div className="flex items-center gap-2 mb-3">
                      <span className="text-emerald-700 font-black text-lg">{formatPrice(product.price)}</span>
                      <span className="text-gray-400 text-xs line-through font-bold">{formatPrice(Math.round(product.price * 1.15))}</span>
                   </div>
                   
                   <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="w-full bg-emerald-50 text-emerald-700 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-colors"
                   >
                      <ShoppingCart size={14} />
                      أضف للسلة
                   </button>
                </div>
              </motion.div>
            ))}
            
            {/* View All Card */}
            <div className="snap-center shrink-0 w-[100px] flex items-center justify-center">
               <button onClick={() => window.location.hash = '#/'} className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all group">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      </div>
    </section>
  );
};

export default WeeklyOffers;
