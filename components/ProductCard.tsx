
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onOrderNow: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails, onOrderNow, formatPrice }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="group relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 cursor-pointer active:scale-[0.98] transform"
      role="article"
      aria-label={`منتج ${product.name}`}
    >
      {/* Decorative Gradient Blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl group-hover:bg-emerald-400/30 transition-all" />
      
      {/* Image Container with Shimmer Loading */}
      <div className="relative aspect-square overflow-hidden m-3 rounded-[1.5rem] bg-gray-100">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-emerald-800 shadow-sm border border-white/50">
            {product.category}
          </span>
          {product.status && (
            <span className="bg-amber-400/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-amber-950 shadow-sm border border-white/50">
              {product.status}
            </span>
          )}
        </div>
      </div>
      
      <div className="px-5 pb-5 pt-2">
        <h3 className="text-base md:text-lg font-black text-emerald-950 mb-2 truncate leading-tight group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-end justify-between mb-5">
          <div className="flex flex-col">
            <span className="text-xs text-emerald-600/60 font-bold line-through decoration-amber-500/50">
              {formatPrice(product.price * 1.15)}
            </span>
            <span className="text-xl md:text-2xl font-black text-emerald-800">
              {formatPrice(product.price)}
            </span>
          </div>
          
          {/* Quick Add Button (Icon Only) */}
          <button 
             onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
             className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100"
             aria-label="أضف للسلة سريعاً"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
        
        <button 
          type="button"
          onClick={(e) => { e.stopPropagation(); onOrderNow(product); }}
          className="w-full bg-emerald-950 text-white py-3.5 rounded-xl hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center justify-center gap-2 font-black text-sm active:scale-95 group-hover:tracking-wider duration-300"
        >
          شراء فوري
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
