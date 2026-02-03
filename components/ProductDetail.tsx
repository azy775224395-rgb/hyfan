
import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onOrderNow: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart, onOrderNow }) => {
  const WHATSAPP_NUMBER = '967784400333';
  
  const handleMoreInfoWhatsApp = () => {
    const productUrl = `${window.location.origin}/#product-${product.id}`;
    const message = `اريد الحصول على المزيد من المعلومات حول هذا المنتج:\n\n*المنتج:* ${product.name}\n*السعر:* ${product.price} ر.س\n*رابط المنتج:* ${productUrl}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-emerald-50 flex flex-col md:flex-row min-h-[70vh] relative">
      <button 
        onClick={onClose} 
        className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur border border-gray-100 p-3 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center gap-2 font-bold text-sm shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        العودة
      </button>

      <div className="w-full md:w-1/2 bg-emerald-50/20 flex items-center justify-center p-8">
        <img src={product.image} alt={product.name} className="max-w-full h-auto rounded-3xl shadow-2xl" />
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col">
        <div className="mb-10">
          <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-100 px-4 py-2 rounded-full border border-emerald-200">{product.category}</span>
          <h2 className="text-3xl md:text-5xl font-black text-emerald-950 mt-8 mb-4 leading-tight">{product.name}</h2>
          <div className="text-3xl md:text-4xl font-black text-emerald-600">{product.price} <small className="text-sm text-gray-400">ر.س</small></div>
        </div>

        <div className="space-y-10 flex-grow">
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">الوصف</h3>
            <p className="text-gray-600 leading-relaxed text-lg font-medium">{product.fullDescription || product.description}</p>
          </div>
          {product.specs && (
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">المواصفات</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-emerald-900 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 font-bold">
                    <svg className="text-emerald-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <button 
            onClick={() => onOrderNow(product)}
            className="bg-emerald-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl active:scale-95 text-lg"
          >
            اطلب الآن
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-emerald-950 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-900 transition-all shadow-xl active:scale-95 text-lg"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
