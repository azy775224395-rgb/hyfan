
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
      className="bg-white/60 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/80 hover:border-emerald-400 hover:bg-white/90 hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)] transition-all duration-700 group cursor-pointer relative mx-auto w-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col gap-1.5 md:gap-2">
          <span className="bg-white/90 backdrop-blur px-2.5 py-1 md:px-4 py-2 rounded-full text-[8px] md:text-[10px] font-black text-emerald-700 shadow-xl border border-emerald-50 uppercase tracking-widest">
            {product.category}
          </span>
          {product.status && (
            <span className="bg-emerald-600 text-white px-2.5 py-1 md:px-4 py-2 rounded-full text-[8px] md:text-[10px] font-black shadow-2xl border border-white/20 animate-pulse">
              {product.status}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 md:p-8">
        <h3 className="text-sm md:text-xl font-black text-emerald-950 mb-1.5 md:mb-3 truncate group-hover:text-emerald-700 transition-colors">{product.name}</h3>
        <p className="text-emerald-800/60 text-[10px] md:text-xs mb-4 md:mb-8 line-clamp-2 min-h-[24px] md:min-h-[32px] leading-relaxed font-medium">
          {product.description}
        </p>
        
        <div className="flex flex-col gap-3 md:gap-6 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-lg md:text-3xl font-black text-emerald-700 tracking-tighter">
              {product.price} <small className="text-[10px] md:text-xs font-bold text-emerald-300">ر.س</small>
            </span>
            <div className="flex gap-0.5 md:gap-1">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className="w-2.5 h-2.5 md:w-3.5 h-3.5 text-emerald-500 fill-current opacity-80" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 md:gap-3">
            <button 
              onClick={handleOrderWhatsApp}
              className="flex-grow bg-emerald-600 text-white py-2.5 md:py-4 rounded-xl md:rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 md:gap-3 font-black text-[10px] md:text-sm active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              اطلب الآن
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-2.5 md:p-4 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl hover:bg-emerald-100 hover:text-emerald-700 transition-all border border-emerald-100 active:scale-95 shadow-sm"
              title="أضف للسلة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[22px] md:h-[22px]"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
