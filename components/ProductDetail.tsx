
import React, { useEffect } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onOrderNow: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart, onOrderNow, formatPrice }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'product-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": [product.image],
      "description": product.description,
      "sku": product.id,
      "brand": {
        "@type": "Brand",
        "name": "حيفان"
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "SAR",
        "price": product.price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    });
    document.head.appendChild(script);

    return () => {
      const oldScript = document.getElementById('product-schema');
      if (oldScript) oldScript.remove();
    };
  }, [product]);

  return (
    <article className="min-h-screen bg-white animate-fade-in flex flex-col">
      <nav className="bg-emerald-50/50 py-4 border-b border-emerald-100" aria-label="Breadcrumb">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <ol className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <li><button type="button" onClick={onClose} className="hover:text-emerald-600 transition-colors">الرئيسية</button></li>
            <li><span>/</span></li>
            <li className="text-emerald-600">{product.category}</li>
            <li><span>/</span></li>
            <li className="text-emerald-950 truncate max-w-[150px]">{product.name}</li>
          </ol>
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 bg-white rounded-xl border border-emerald-100 hover:text-emerald-600 transition-all flex items-center gap-2 font-bold text-xs shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            رجوع
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="bg-emerald-50/20 rounded-[3rem] p-12 flex items-center justify-center border border-emerald-50 shadow-inner group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full h-auto rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
          {product.status && (
            <div className="flex justify-center">
              <span className="bg-amber-100 text-amber-700 px-8 py-2 rounded-full font-black text-sm border border-amber-200 shadow-sm">
                {product.status}
              </span>
            </div>
          )}
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <header className="mb-8">
            <span className="text-emerald-600 text-xs font-black uppercase tracking-widest bg-emerald-100 px-4 py-1.5 rounded-full inline-block mb-6">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-emerald-950 mb-6 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl font-black text-emerald-600">
                {formatPrice(product.price)}
              </span>
              <span className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-lg text-xs font-bold border border-emerald-100">شامل الضريبة والشحن</span>
            </div>
          </header>

          <section className="space-y-10 flex-grow">
            <div>
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 border-b pb-2">تفاصيل المنتج</h2>
              <p className="text-gray-600 leading-relaxed text-xl font-medium">
                {product.fullDescription || product.description}
              </p>
            </div>

            {product.specs && (
              <div>
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 border-b pb-2">المواصفات التقنية</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-emerald-900 bg-emerald-50/50 p-5 rounded-[1.5rem] border border-emerald-100 font-bold hover:bg-white transition-colors">
                      <svg className="text-emerald-500 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <div className="mt-16 flex flex-col sm:flex-row gap-4 border-t pt-10">
            <button 
              type="button"
              onClick={() => onOrderNow(product)}
              className="flex-1 bg-emerald-600 text-white py-6 rounded-2xl font-black flex items-center justify-center gap-4 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95 text-xl"
            >
              شراء فوري الآن
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button 
              type="button"
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-emerald-950 text-white py-6 rounded-2xl font-black flex items-center justify-center gap-4 hover:bg-black transition-all shadow-xl active:scale-95 text-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              أضف للسلة
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;
