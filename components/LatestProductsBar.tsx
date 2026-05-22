import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import OptimizedImage from './ui/OptimizedImage';
import { Zap } from 'lucide-react';

interface LatestProductsBarProps {
  products: Product[];
  onViewDetails: (p: Product) => void;
  formatPrice: (p: number) => string;
  onAddToCart?: (p: Product) => void;
}

const LatestProductsBar: React.FC<LatestProductsBarProps> = ({ products, onViewDetails, formatPrice, onAddToCart }) => {
  // Take top latest 12 products
  const latestProducts = [...products].reverse().slice(0, 12);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = () => {
    setIsHovered(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 10000);
  };

  // Auto-scroll logic every 4 seconds
  useEffect(() => {
    if (isHovered) return;

    const intervalId = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = container.clientWidth * 0.8;
        
        if (Math.abs(container.scrollLeft) + container.clientWidth >= container.scrollWidth - 10) {
             container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
             container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <div className="w-full bg-white border-y border-emerald-100/50 overflow-hidden py-1.5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
       <div className="flex items-center justify-between px-2 md:px-4 mb-1.5">
         <h2 className="text-sm md:text-base font-black flex items-center gap-1.5 text-gray-900 border-r-2 border-primary pr-2">
           <Zap size={16} className="text-primary fill-primary/20" />
           أحدث المنتجات
         </h2>
         <a href="#/category/latest" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-primary transition-colors">
            عرض الكل
         </a>
       </div>

       {/* Horizontal Scroll Container without margins */}
       <div 
         ref={scrollContainerRef}
         onTouchStart={handleInteraction}
         onMouseEnter={handleInteraction}
         className="flex gap-2 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 pb-1"
       >
         {latestProducts.map((product) => (
           <motion.div
             key={product.id}
             whileTap={{ scale: 0.96 }}
             className="min-w-[110px] max-w-[110px] md:min-w-[130px] md:max-w-[130px] bg-white rounded-xl border border-gray-100 overflow-hidden snap-start flex-shrink-0 cursor-pointer hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all group"
             onClick={() => onViewDetails(product)}
           >
             <div className="w-full h-24 md:h-28 relative bg-gray-50/50 overflow-hidden p-2">
               <OptimizedImage
                 src={product.image}
                 alt={product.name}
                 className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
               />
               {product.status === 'جديد' && (
                 <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm z-10">
                   جديد
                 </span>
               )}
             </div>
             <div className="p-1.5 md:p-2 space-y-1 bg-white">
               <h3 className="font-bold text-[9px] md:text-[10px] text-gray-800 line-clamp-2 leading-tight min-h-[1.75rem] md:min-h-[2rem]">
                 {product.name}
               </h3>
               <div className="pt-1 border-t border-gray-50 flex items-center justify-between">
                 <span className="text-primary font-black text-xs md:text-sm">
                   {formatPrice(product.price)}
                 </span>
                  {onAddToCart && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="bg-primary text-white w-6 h-6 rounded-md flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </button>
                  )}
               </div>
             </div>
           </motion.div>
         ))}
       </div>
    </div>
  );
};

export default LatestProductsBar;
