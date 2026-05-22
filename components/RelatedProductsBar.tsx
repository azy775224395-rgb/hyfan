import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import OptimizedImage from './ui/OptimizedImage';
import { Sparkles } from 'lucide-react';

interface RelatedProductsBarProps {
  products: Product[];
  onViewDetails: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const RelatedProductsBar: React.FC<RelatedProductsBarProps> = ({ products, onViewDetails, formatPrice }) => {
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
    if (isHovered || products.length === 0) return;

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
  }, [isHovered, products]);

  if (products.length === 0) return null;

  return (
    <div className="w-full bg-white border-t border-emerald-100/50 pt-6 pb-8 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] mt-8">
       <div className="flex items-center px-4 md:px-8 mb-4">
         <h2 className="text-lg md:text-xl font-black flex items-center gap-2 text-gray-900 border-r-4 border-amber-500 pr-3">
           <Sparkles size={20} className="text-amber-500 fill-amber-500/20" />
           قد يعجبك ايضاً
         </h2>
       </div>

       {/* Horizontal Scroll Container */}
       <div 
         ref={scrollContainerRef}
         onTouchStart={handleInteraction}
         onMouseEnter={handleInteraction}
         className="flex gap-4 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 md:px-8 pb-4"
       >
         {products.map((product) => (
           <motion.div
             key={product.id}
             whileTap={{ scale: 0.96 }}
             className="min-w-[140px] max-w-[140px] md:min-w-[180px] md:max-w-[180px] bg-white rounded-2xl border border-gray-100 overflow-hidden snap-start flex-shrink-0 cursor-pointer hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all group pb-2"
             onClick={() => onViewDetails(product)}
           >
             <div className="w-full h-32 md:h-40 relative bg-gray-50/50 p-3">
               <OptimizedImage
                 src={product.image}
                 alt={product.name}
                 className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
               />
             </div>
             <div className="px-3 py-2 space-y-1.5">
               <h3 className="font-bold text-[11px] md:text-xs text-gray-800 line-clamp-2 leading-tight min-h-[2rem]">
                 {product.name}
               </h3>
               <div className="pt-2 border-t border-gray-50">
                 <span className="text-primary font-black text-sm md:text-base">
                   {formatPrice(product.price)}
                 </span>
               </div>
             </div>
           </motion.div>
         ))}
       </div>
    </div>
  );
};

export default RelatedProductsBar;
