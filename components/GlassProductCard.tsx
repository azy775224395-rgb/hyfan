
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  
  // 3D Tilt Logic
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onViewDetails(product)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-shadow duration-500 cursor-pointer h-full"
    >
      {/* Dynamic Status Badge - Floating in 3D */}
      <div 
        className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end"
        style={{ transform: "translateZ(30px)" }}
      >
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

      {/* Image Area - Pushed Back slightly but content pops */}
      <div 
        className="relative aspect-[4/3] m-2 rounded-[1.8rem] overflow-hidden bg-gradient-to-br from-gray-50 to-white"
        style={{ transform: "translateZ(10px)" }}
      >
        <motion.img 
          src={product.image} 
          alt={`صورة منتج ${product.name} - ${product.category}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-contain p-4 mix-blend-multiply transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: "translateZ(20px)" }}
        />
        {!isLoaded && (
           <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>

      {/* Content Area */}
      <div className="px-5 pb-5 pt-2" style={{ transform: "translateZ(20px)" }}>
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
             style={{ transform: "translateZ(10px)" }}
          >
            <ShoppingCart size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
            className="col-span-1 bg-white border border-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center hover:bg-emerald-50 transition-colors h-11"
            aria-label="عرض التفاصيل"
            style={{ transform: "translateZ(15px)" }}
          >
            <Eye size={20} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onOrderNow(product); }}
            className="col-span-3 bg-emerald-950 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-colors h-11"
            style={{ transform: "translateZ(15px)" }}
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
