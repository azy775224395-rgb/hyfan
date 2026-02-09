
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3 }}
      onClick={() => onViewDetails(product)}
      className="group relative bg-white border border-gray-100 rounded-[1.5rem] shadow-md hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 cursor-pointer h-full hover:-translate-y-1 overflow-hidden"
    >
      {/* Dynamic Status Badge */}
      <div 
        className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end"
      >
         <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-black text-emerald-800 shadow-sm border border-gray-200 flex items-center gap-1">
            <Zap size={10} className="fill-emerald-600 text-emerald-600" />
            {product.category}
         </span>
         {product.status && (
            <span className="bg-amber-400 text-amber-950 px-2.5 py-1 rounded-full text-[9px] font-black shadow-sm flex items-center gap-1">
              <CheckCircle2 size={10} />
              {product.status}
            </span>
         )}
      </div>

      {/* Image Area */}
      <div 
        className="relative aspect-[4/3] m-2 rounded-[1.2rem] overflow-hidden bg-gray-50 border border-gray-100/50"
      >
        <OptimizedImage 
          src={product.image} 
          alt={`صورة منتج ${product.name} - ${product.category}`}
          wrapperClassName="w-full h-full"
          className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="px-4 pb-4 pt-1">
        <h3 className="text-sm md:text-base font-black text-emerald-950 mb-1 truncate leading-tight group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-500 font-bold mb-3 line-clamp-1">{product.description}</p>
        
        <div className="flex items-end justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold line-through decoration-red-400/50">
              {formatPrice(product.price * 1.15)}
            </span>
            <span className="text-lg md:text-xl font-black text-emerald-800 tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <motion.button 
             whileTap={{ scale: 0.8 }}
             onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
             className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-colors shadow-sm"
          >
            <ShoppingCart size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
            className="col-span-1 bg-white border border-gray-200 text-emerald-700 rounded-xl flex items-center justify-center hover:bg-emerald-50 transition-colors h-10 shadow-sm"
            aria-label="عرض التفاصيل"
          >
            <Eye size={18} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onOrderNow(product); }}
            className="col-span-3 bg-emerald-950 text-white rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-1.5 shadow-md hover:bg-emerald-800 transition-colors h-10"
          >
            شراء فوري
            <Zap size={14} className="fill-yellow-400 text-yellow-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GlassProductCard;
