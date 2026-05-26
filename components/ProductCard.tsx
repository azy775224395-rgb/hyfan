
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
    <a 
      href={`#/product/${product.id}`}
      onClick={(e) => { e.preventDefault(); onViewDetails(product); }}
      className="group relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 cursor-pointer active:scale-[0.98] block transform"
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
          alt={`صورة ${product.name} - طاقة شمسية`} 
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
        
        <div className="flex flex-col mb-4">
          <span className="text-xs text-emerald-600/60 font-bold line-through decoration-amber-500/50">
            {formatPrice(product.price * 1.15)}
          </span>
          <span className="text-xl md:text-2xl font-black text-emerald-800">
            {formatPrice(product.price)}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="flex-1 bg-emerald-50 text-emerald-700 py-3.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-all font-black text-xs md:text-sm active:scale-95 flex items-center justify-center gap-1.5"
          >
            أضف للسلة
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onOrderNow(product); }}
            className="flex-1 bg-emerald-950 text-white py-3.5 rounded-xl hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center justify-center gap-1.5 font-black text-xs md:text-sm active:scale-95 group-hover:tracking-wider duration-300"
          >
            شراء فوري
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
