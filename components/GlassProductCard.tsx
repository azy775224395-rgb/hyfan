
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Zap, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import OptimizedImage from './ui/OptimizedImage';

interface GlassProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onOrderNow: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const GlassProductCard: React.FC<GlassProductCardProps> = ({ product, onAddToCart, onViewDetails, onOrderNow, formatPrice }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.25 }}
      onClick={() => onViewDetails(product)}
      className="group relative bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col overflow-hidden"
    >
      {/* Dynamic Status Badge */}
      <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20 flex flex-col gap-1 items-end">
         {product.status && (
            <span className="bg-accent text-white px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-black shadow-sm flex items-center gap-1">
              {product.status}
            </span>
         )}
         {product.oldPrice && (
            <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-black shadow-sm">
              خصم
            </span>
         )}
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/4] overflow-hidden bg-white p-2 md:p-3">
        <OptimizedImage 
          src={product.image} 
          alt={product.name}
          wrapperClassName="w-full h-full"
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick action overlay for desktop */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 hidden md:flex">
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
             className="w-12 h-12 bg-white text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
           >
             <ShoppingCart size={20} />
           </motion.button>
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
             className="w-12 h-12 bg-white text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
           >
             <Eye size={20} />
           </motion.button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-2.5 md:p-4 flex flex-col flex-grow bg-white">
        <div className="text-[9px] md:text-[10px] font-bold text-gray-400 mb-1">{product.category}</div>
        <h3 className="text-xs md:text-base font-bold text-slate-800 mb-1 md:mb-2 truncate leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto flex flex-col">
          <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
            <span className="text-sm md:text-xl font-black text-primary tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] md:text-xs text-gray-400 font-bold line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-1.5 md:gap-2">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={(e) => { e.stopPropagation(); onOrderNow(product); }}
              className="w-full bg-primary text-white py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-1.5 shadow-sm hover:bg-secondary transition-all"
            >
              <Zap size={12} className="fill-white md:w-[14px] md:h-[14px]" />
              اشتري الآن
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              className="md:hidden w-full bg-gray-50 text-gray-700 py-2 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1.5 border border-gray-100"
            >
              <ShoppingCart size={12} />
              أضف للسلة
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GlassProductCard;
