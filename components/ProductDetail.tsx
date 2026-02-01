
import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const WHATSAPP_NUMBER = '967784400333';
  
  const handleOrderWhatsApp = () => {
    const productUrl = `${window.location.origin}/#product-${product.id}`;
    const message = `السلام عليكم، أريد شراء هذا المنتج:\n\n*المنتج:* ${product.name}\n*السعر:* ${product.price} ر.س\n*رابط المنتج:* ${productUrl}\n\nاريد شراء هذا المنتج`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMoreInfoWhatsApp = () => {
    const productUrl = `${window.location.origin}/#product-${product.id}`;
    const message = `اريد الحصول على المزيد من المعلومات حول هذا المنتج:\n\n*المنتج:* ${product.name}\n*السعر:* ${product.price} ر.س\n*رابط المنتج:* ${productUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[3rem] overflow-hidden shadow-sm border border-emerald-50 flex flex-col md:flex-row min-h-[70vh] animate-fade-in relative">
      {/* Back Button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-white/80 backdrop-blur border border-gray-100 p-2 md:p-3 rounded-xl md:rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 shadow-sm transition-all flex items-center gap-2 font-bold text-xs md:text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        العودة
      </button>

      {/* Image Section */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="w-full md:w-1/2 p-5 md:p-14 flex flex-col">
        <div className="mb-6 md:mb-10">
          <span className="text-emerald-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-emerald-100">
            {product.category}
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mt-4 md:mt-6 mb-2 md:mb-4 leading-tight">{product.name}</h2>
          <div className="text-2xl md:text-3xl font-black text-emerald-600">{product.price} <span className="text-xs md:text-sm font-bold text-gray-300">ر.س</span></div>
        </div>

        <div className="space-y-8 md:space-y-10 flex-grow">
          <div>
            <h3 className="text-[11px] md:text-sm font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">نظرة عامة</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-lg">
              {product.fullDescription || product.description}
            </p>
          </div>

          {product.specs && (
            <div>
              <h3 className="text-[11px] md:text-sm font-black text-gray-400 uppercase tracking-widest mb-4 md:mb-6">المواصفات الفنية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-8">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-700 bg-gray-50/50 p-2.5 md:p-3 rounded-xl md:rounded-2xl border border-gray-100">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="text-emerald-600" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {spec}
                  </div>
                ))}
              </div>

              <button 
                onClick={handleMoreInfoWhatsApp}
                className="w-full bg-white border-2 border-emerald-600 text-emerald-700 py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-2 md:gap-3 hover:bg-emerald-50 transition-all active:scale-95 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                طلب معلومات إضافية
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <button 
            onClick={handleOrderWhatsApp}
            className="bg-emerald-600 text-white py-4 px-6 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95 text-sm md:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            اطلب عبر واتساب
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-gray-900 text-white py-4 px-6 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl active:scale-95 text-sm md:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            أضف إلى السلة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
