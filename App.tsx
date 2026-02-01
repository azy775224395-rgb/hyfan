
import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import AiAssistant from './components/AiAssistant';
import Hero from './components/Hero';
import FaqSection from './components/FaqSection';
import ReviewSection from './components/ReviewSection';
import SolarCalculator from './components/SolarCalculator';
import BrandSection from './components/BrandSection';
import StoryModal from './components/StoryModal';
import WarrantyModal from './components/WarrantyModal';

type ViewState = 
  | { type: 'home' }
  | { type: 'product'; product: Product }
  | { type: 'story' }
  | { type: 'warranty' };

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewState>({ type: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  
  // تحديث ترتيب الفئات: الأجهزة الكهربائية أولاً
  const categoryOrder = [
    'الاجهزة الكهربائيه',
    'الباقات', 
    'الالواح الشمسيه', 
    'البطاريات', 
    'الانفرترات', 
    'اجهزة الطباخه'
  ];

  const categories = useMemo(() => {
    const existingCategories = Array.from(new Set(products.map(p => p.category)));
    return categoryOrder.filter(c => existingCategories.includes(c));
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');

  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (activeView.type === 'home') {
      const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => observer.observe(el));

      return () => {
        elements.forEach(el => observer.unobserve(el));
      };
    }
  }, [activeView, searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = (p.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
                           (p.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
      const matchesCategory = p.category === selectedCategory;
      return matchesSearch && (selectedCategory ? matchesCategory : true);
    });
  }, [products, searchQuery, selectedCategory]);

  const navigateTo = (view: ViewState) => {
    setActiveView(view);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (activeView.type) {
      case 'product':
        return (
          <ProductDetail 
            product={activeView.product} 
            onClose={() => navigateTo({ type: 'home' })}
            onAddToCart={addToCart}
          />
        );
      case 'story':
        return (
          <StoryModal 
            onClose={() => navigateTo({ type: 'home' })} 
          />
        );
      case 'warranty':
        return (
          <WarrantyModal
            onClose={() => navigateTo({ type: 'home' })}
          />
        );
      case 'home':
      default:
        return (
          <>
            <Hero onOpenStory={() => navigateTo({ type: 'story' })} />
            
            <div className="mt-16 md:mt-24 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0" id="products-grid">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900">منتجاتنا المختارة</h2>
                  <p className="text-gray-500 mt-2 font-bold">تصفح حسب التصنيف</p>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-black transition-all whitespace-nowrap ${
                        selectedCategory === cat 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                        : 'bg-white text-gray-400 border border-gray-100 hover:border-emerald-200 hover:text-emerald-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                      onViewDetails={(p) => navigateTo({ type: 'product', product: p })}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 md:py-24 bg-white rounded-[2rem] md:rounded-[3rem] border border-dashed border-gray-200">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">عذراً، لم نجد نتائج</h3>
                  <p className="text-gray-400 mt-2">جرب البحث بكلمات أخرى</p>
                </div>
              )}
            </div>

            <div className="mt-24 md:mt-32 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <SolarCalculator />
            </div>

            <div className="mt-24 md:mt-32 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <ReviewSection />
            </div>

            {/* تم نقل قسم العلامات التجارية إلى هنا (أسفل التقييمات) */}
            <div className="reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <BrandSection />
            </div>

            <div className="mt-24 md:mt-32 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0" id="faq-section">
              <FaqSection />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden text-right" dir="rtl">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogoClick={() => navigateTo({ type: 'home' })}
      />

      <main className="flex-grow container mx-auto px-3 md:px-4 py-6 md:py-8 animate-fade-in">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 md:py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div 
                className="flex items-center gap-3 mb-6 cursor-pointer"
                onClick={() => navigateTo({ type: 'home' })}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden shadow-xl shadow-emerald-100 border border-emerald-50">
                  <img src={LOGO_URL} alt="حيفان للطاقة" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl md:text-2xl font-black text-gray-900">حيفان للطاقة</span>
              </div>
              <p className="text-gray-500 leading-relaxed max-w-md font-medium text-sm md:text-base">
                رائدون في تقديم حلول الطاقة الشمسية المتكاملة في اليمن. نهدف إلى توفير طاقة نظيفة ومستدامة بأسعار تنافسية وجودة عالمية لعام 2026 وما بعده.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-gray-900 mb-5 md:mb-6 text-base md:text-lg">روابط سريعة</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 font-bold text-sm md:text-base">
                <li><button onClick={() => navigateTo({ type: 'home' })} className="hover:text-emerald-600 transition-colors text-right w-full">الرئيسية</button></li>
                <li><button onClick={() => navigateTo({ type: 'story' })} className="hover:text-emerald-600 transition-colors text-right w-full">قصة نجاحنا</button></li>
                <li><button onClick={() => { navigateTo({ type: 'home' }); setTimeout(() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-emerald-600 transition-colors text-right w-full">منتجاتنا</button></li>
                <li><button onClick={() => navigateTo({ type: 'warranty' })} className="hover:text-emerald-600 transition-colors text-right w-full">سياسة الضمان</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-900 mb-5 md:mb-6 text-base md:text-lg">تواصل معنا</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 font-bold text-sm md:text-base">
                <li>
                  <a href="tel:+967784400222" className="flex items-center gap-3 hover:text-emerald-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <span dir="ltr" className="text-right inline-block">+967 784 400 222</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/967784400333" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-emerald-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
                    </div>
                    <span dir="ltr" className="text-right inline-block">+967 784 400 333</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-xs md:text-sm font-bold text-center md:text-right">
              جميع الحقوق محفوظة © حيفان للطاقة المتجددة 2026
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />

      <AiAssistant products={products} />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
