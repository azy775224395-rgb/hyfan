
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const WHATSAPP_NUMBER = '967775224395';
  
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
      className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300 group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-emerald-600 shadow-sm uppercase tracking-widest border border-emerald-50">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate group-hover:text-emerald-600 transition-colors">{product.name}</h3>
        <p className="text-gray-400 text-xs mb-6 line-clamp-2 min-h-[32px] leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-emerald-600">
              {product.price} <small className="text-xs font-normal text-gray-300">ر.س</small>
            </span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleOrderWhatsApp}
              className="flex-grow bg-emerald-600 text-white py-3 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 font-bold text-sm active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              اطلب الآن
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-gray-100 active:scale-95"
              title="أضف للسلة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
