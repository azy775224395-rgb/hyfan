
import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const WHATSAPP_NUMBER = '967775224395';
  
  const handleOrderWhatsApp = () => {
    const productUrl = `${window.location.origin}/#product-${product.id}`;
    const message = `السلام عليكم، أريد شراء هذا المنتج:\n\n*المنتج:* ${product.name}\n*السعر:* ${product.price} ر.س\n*رابط المنتج:* ${productUrl}\n\nاريد شراء هذا المنتج`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-pop-in">
        <button 
          onClick={onClose} 
          className="absolute top-6 left-6 z-10 bg-white/90 p-3 rounded-full hover:bg-white shadow-xl transition-all hover:scale-110 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover md:max-h-full"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col overflow-y-auto">
          <div className="mb-10">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
              {product.category}
            </span>
            <h2 className="text-4xl font-black text-gray-900 mt-6 mb-4 leading-tight">{product.name}</h2>
            <div className="text-3xl font-black text-emerald-600">{product.price} <span className="text-sm font-bold text-gray-300">ر.س</span></div>
          </div>

          <div className="space-y-10 flex-grow">
            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">نظرة عامة</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.fullDescription || product.description}
              </p>
            </div>

            {product.specs && (
              <div>
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">المواصفات الفنية</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <svg className="text-emerald-600" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={handleOrderWhatsApp}
              className="bg-emerald-600 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              اطلب عبر واتساب
            </button>
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="bg-gray-900 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              أضف إلى السلة
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pop-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in {
          animation: pop-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
