
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onOrderNow: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails, onOrderNow }) => {
  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-[2rem] overflow-hidden border border-emerald-50 hover:border-emerald-200 transition-all duration-300 group cursor-pointer relative w-full shadow-sm hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-emerald-50">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          width="400"
          height="400"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-emerald-700 shadow-lg border border-emerald-50">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-sm md:text-lg font-black text-emerald-950 mb-1 truncate leading-tight">{product.name}</h3>
        <p className="text-emerald-800/60 text-[10px] md:text-sm mb-4 line-clamp-1 font-bold">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-5">
          <span className="text-base md:text-2xl font-black text-emerald-700">
            {product.price} <small className="text-[10px] md:text-xs font-bold text-emerald-300">ر.س</small>
          </span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onOrderNow(product); }}
            className="flex-1 bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-500 transition-all shadow-lg flex items-center justify-center gap-2 font-black text-[11px] md:text-sm active:scale-95"
          >
            اطلب الآن
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="flex-1 bg-white text-emerald-600 py-3 rounded-xl border-2 border-emerald-100 hover:bg-emerald-50 transition-all shadow-sm flex items-center justify-center gap-2 font-black text-[11px] md:text-sm active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
