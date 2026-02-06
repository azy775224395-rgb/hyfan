
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Zap, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface GlassProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onOrderNow: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const GlassProductCard: React.FC<GlassProductCardProps> = ({ product, onAddToCart, onViewDetails, onOrderNow, formatPrice }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={() => onViewDetails(product)}
      className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 cursor-pointer"
    >
      {/* Dynamic Status Badge */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
         <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-emerald-800 shadow-sm border border-emerald-100/50 flex items-center gap-1">
            <Zap size={10} className="fill-emerald-600 text-emerald-600" />
            {product.category}
         </span>
         {product.status && (
            <span className="bg-amber-400/90 text-amber-950 px-3 py-1 rounded-full text-[10px] font-black shadow-sm flex items-center gap-1">
              <CheckCircle2 size={10} />
              {product.status}
            </span>
         )}
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/3] m-2 rounded-[1.8rem] overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-contain p-4 mix-blend-multiply transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        {!isLoaded && (
           <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>

      {/* Content Area */}
      <div className="px-5 pb-5 pt-2">
        <h3 className="text-base font-black text-emerald-950 mb-1 truncate leading-tight group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-500 font-bold mb-4 line-clamp-1">{product.description}</p>
        
        <div className="flex items-end justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold line-through decoration-red-400/50">
              {formatPrice(product.price * 1.15)}
            </span>
            <span className="text-xl font-black text-emerald-800 tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <motion.button 
             whileTap={{ scale: 0.8 }}
             onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
             className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-colors"
          >
            <ShoppingCart size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
            className="col-span-1 bg-white border border-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center hover:bg-emerald-50 transition-colors h-11"
          >
            <Eye size={20} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onOrderNow(product); }}
            className="col-span-3 bg-emerald-950 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-colors h-11"
          >
            شراء فوري
            <Zap size={16} className="fill-yellow-400 text-yellow-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GlassProductCard;
