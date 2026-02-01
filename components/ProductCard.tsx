
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const WHATSAPP_NUMBER = '967784400333';
  
  const handleOrderWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productUrl = `${window.location.origin}/#product-${product.id}`;
    const message = `السلام عليكم، أريد شراء هذا المنتج:\n\n*المنتج:* ${product.name}\n*السعر:* ${product.price} ر.س\n*رابط المنتج:* ${productUrl}\n\nاريد شراء هذا المنتج`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-2xl overflow-hidden border border-emerald-50 hover:border-emerald-200 transition-all duration-300 group cursor-pointer relative w-full"
    >
      <div className="relative aspect-square overflow-hidden bg-emerald-50">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <span className="bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[8px] font-black text-emerald-700 shadow-sm border border-emerald-50">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-xs md:text-base font-black text-emerald-950 mb-1 truncate leading-tight">{product.name}</h3>
        <p className="text-emerald-800/60 text-[9px] md:text-xs mb-3 line-clamp-1 font-medium">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm md:text-xl font-black text-emerald-700">
            {product.price} <small className="text-[8px] md:text-[10px] font-bold text-emerald-300">ر.س</small>
          </span>
        </div>
        
        <div className="flex gap-1.5">
          <button 
            onClick={handleOrderWhatsApp}
            className="flex-grow bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-500 transition-all shadow-md flex items-center justify-center gap-1.5 font-black text-[10px] active:scale-95"
          >
            اطلب الآن
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
