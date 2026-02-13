
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  const startScrollPos = useRef<number | null>(null);

  // 1. Calculate Week Number to use as a Seed
  const currentWeekSeed = useMemo(() => {
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    return weekNumber + now.getFullYear();
  }, []);

  // 2. Select top products
  const baseProducts = useMemo(() => {
    if (products.length === 0) return [];
    let shuffled = [...products];
    const seededRandom = (seed: number) => {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    let m = shuffled.length, t, i;
    let seed = currentWeekSeed;
    while (m) {
      i = Math.floor(seededRandom(seed) * m--);
      t = shuffled[m];
      shuffled[m] = shuffled[i];
      shuffled[i] = t;
      seed++;
    }
    return shuffled.slice(0, 6);
  }, [products, currentWeekSeed]);

  // 3. Create Infinite List (Duplicate 3 times)
  const displayProducts = useMemo(() => {
     if (baseProducts.length === 0) return [];
     // Original + Clone 1 + Clone 2 to allow ample scrolling space before reset
     return [...baseProducts, ...baseProducts, ...baseProducts];
  }, [baseProducts]);

  // 4. Countdown Timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
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
    const timer = setInterval(() => { setTimeLeft(calculateTimeLeft()); }, 60000);
    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, []);

  // 5. Initial Scroll Position Setup
  useEffect(() => {
    if (scrollContainerRef.current) {
        // Just record where we started
        startScrollPos.current = scrollContainerRef.current.scrollLeft;
    }
  }, [displayProducts]);

  // 6. Infinite Reset Logic
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || baseProducts.length === 0) return;

    // Get single item width (card + gap)
    const firstCard = container.firstElementChild as HTMLElement;
    if (!firstCard) return;
    
    const itemWidth = firstCard.offsetWidth + 16; // 16px gap
    const singleSetWidth = itemWidth * baseProducts.length;

    // Calculate displacement from start
    // We assume RTL means we scroll "Left" (negative or decreasing value)
    const currentScroll = container.scrollLeft;
    const start = startScrollPos.current || 0;
    const delta = currentScroll - start;

    // Check if we have scrolled past the first set (abs delta > singleSetWidth)
    if (Math.abs(delta) >= singleSetWidth) {
       // Reset instantly to "start" + remainder
       // Example: if we are at -2500 and setWidth is 2400. We want to be at -100.
       // NewScroll = current - (direction * setWidth)
       
       // Detect direction: 
       // If delta is negative (typical RTL), we add setWidth.
       // If delta is positive (some browsers), we subtract setWidth.
       
       const direction = Math.sign(delta); 
       // If direction is 0, do nothing.
       if (direction !== 0) {
           const resetAmount = -1 * direction * singleSetWidth;
           container.scrollBy({ left: resetAmount, behavior: 'instant' });
       }
    }
  };

  // 7. Auto Scroll Interval
  useEffect(() => {
    if (isPaused || displayProducts.length === 0) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (container) {
        const firstCard = container.firstElementChild as HTMLElement;
        const itemWidth = firstCard ? firstCard.offsetWidth + 16 : 296;
        
        // Move Left (Negative for RTL usually)
        // We use -itemWidth to move to the "next" item in RTL sequence
        container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, displayProducts]);

  if (baseProducts.length === 0) return null;

  return (
    <section className="container mx-auto px-4 mt-8 mb-4">
      <div 
        className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-[2rem] p-6 md:p-8 relative overflow-hidden shadow-xl border border-emerald-800"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
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
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 transition-all"
            style={{ 
              scrollBehavior: 'smooth', 
              WebkitOverflowScrolling: 'touch',
              direction: 'rtl' // Ensure RTL layout
            }}
          >
            {displayProducts.map((product, index) => (
              <motion.div 
                // Use index in key to allow duplicates
                key={`${product.id}-${index}`}
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
