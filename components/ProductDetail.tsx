
import React, { useEffect } from 'react';
import { Product } from '../types';
import SEO from './SEO';
import ProductSchema from './ProductSchema';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onOrderNow: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart, onOrderNow, formatPrice }) => {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="min-h-screen bg-[#f8fafc] animate-slide-up flex flex-col pb-24 md:pb-0">
      <SEO 
        title={product.name}
        description={product.fullDescription || product.description}
        image={product.image}
        type="product"
      />
      
      {/* Google Merchant Structured Data */}
      <ProductSchema 
        name={product.name}
        description={product.fullDescription || product.description}
        image={product.image}
        price={product.price}
        currency="SAR"
        sku={product.id}
        brand="حيفان للطاقة"
      />

      {/* Glassy Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 -mr-2 text-emerald-950 hover:bg-emerald-50 rounded-full transition-colors flex items-center gap-2 font-black"
            aria-label="العودة"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span className="text-sm">العودة</span>
          </button>
          
          <h1 className="text-sm font-black text-emerald-950 truncate max-w-[200px]">{product.name}</h1>
          
          <button className="p-2 rounded-full hover:bg-emerald-50 text-emerald-600">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Product Image Section */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="relative aspect-square bg-white rounded-[2.5rem] p-8 flex items-center justify-center border border-white shadow-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 to-transparent opacity-50" />
            <img 
              src={product.image} 
              alt={product.name} 
              className="relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" 
              loading="eager"
              fetchPriority="high"
            />
            {product.status && (
              <span className="absolute top-6 right-6 bg-amber-400 text-amber-950 px-4 py-2 rounded-full font-black text-xs shadow-lg border border-white/20 z-20">
                {product.status}
              </span>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              ضمان الوكيل
            </span>
          </div>
          
          <h2 className="text-2xl md:text-5xl font-black text-emerald-950 mb-4 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl font-black text-emerald-700 leading-none">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-400 line-through font-bold mb-1">
              {formatPrice(product.price * 1.2)}
            </span>
            <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded text-[10px] font-black mb-1">
              وفر 20%
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm mb-8">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">الوصف</h3>
             <p className="text-gray-600 leading-relaxed font-medium text-lg">
               {product.fullDescription || product.description}
             </p>
          </div>

          {product.specs && (
            <div className="mb-8">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 px-2">المواصفات التقنية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-emerald-900 bg-white p-4 rounded-2xl border border-gray-100 font-bold shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Desktop Actions (Hidden on Mobile) */}
          <div className="hidden lg:flex gap-4 mt-auto pt-8 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => onOrderNow(product)}
              className="flex-1 bg-emerald-950 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all shadow-xl active:scale-95 text-lg"
            >
              شراء فوري
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button 
              type="button"
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-white text-emerald-900 border-2 border-emerald-900 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all active:scale-95 text-lg"
            >
              أضف للسلة
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Actions Bar (Thumb Friendly) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 pb-8 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] flex gap-3 animate-slide-up">
         <button 
            type="button"
            onClick={() => onAddToCart(product)}
            className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center border border-emerald-200 active:scale-90 transition-transform"
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
         </button>
         <button 
            type="button"
            onClick={() => onOrderNow(product)}
            className="flex-grow bg-emerald-950 text-white rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
         >
            شراء فوري بـ {formatPrice(product.price)}
         </button>
      </div>
    </article>
  );
};

export default ProductDetail;
