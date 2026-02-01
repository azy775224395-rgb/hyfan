
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
import FloatingContact from './components/FloatingContact';
import AnimatedBackground from './components/AnimatedBackground';

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
          <div className="bg-white/80 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/40 shadow-2xl p-4 md:p-8">
            <ProductDetail 
              product={activeView.product} 
              onClose={() => navigateTo({ type: 'home' })}
              onAddToCart={addToCart}
            />
          </div>
        );
      case 'story':
        return (
          <div className="bg-white/80 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/40 shadow-2xl">
            <StoryModal 
              onClose={() => navigateTo({ type: 'home' })} 
            />
          </div>
        );
      case 'warranty':
        return (
          <div className="bg-white/80 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/40 shadow-2xl">
            <WarrantyModal
              onClose={() => navigateTo({ type: 'home' })}
            />
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero onOpenStory={() => navigateTo({ type: 'story' })} />
            
            <div className="mt-12 md:mt-24 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0 px-4 md:px-0" id="products-grid">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
                <div className="p-4 md:p-5 rounded-2xl md:rounded-3xl bg-emerald-100/30 backdrop-blur-xl border border-white/20 inline-block shadow-xl">
                  <h2 className="text-xl md:text-4xl font-black text-emerald-950">منتجاتنا المختارة</h2>
                  <p className="text-emerald-700 mt-1 font-bold text-xs md:text-sm">حلول طاقة ذكية لعام 2026</p>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 md:px-8 md:py-3 rounded-full text-[11px] md:text-sm font-black transition-all whitespace-nowrap border-2 ${
                        selectedCategory === cat 
                        ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 border-emerald-600' 
                        : 'bg-white/60 backdrop-blur-md text-emerald-800 border-white/40 hover:border-emerald-500/50 hover:text-emerald-700'
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
                <div className="text-center py-12 md:py-24 bg-white/40 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-dashed border-emerald-200">
                  <h3 className="text-lg font-bold text-emerald-950">عذراً، لم نجد نتائج</h3>
                  <p className="text-emerald-600 mt-2 font-medium">جرب البحث بكلمات أخرى</p>
                </div>
              )}
            </div>

            <div className="mt-20 md:mt-32 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0 px-4 md:px-0">
              <SolarCalculator />
            </div>

            <div className="mt-20 md:mt-32 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0 px-4 md:px-0">
              <ReviewSection />
            </div>

            <div className="mt-16 md:mt-20 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <BrandSection />
            </div>

            <div className="mt-20 md:mt-32 reveal-on-scroll opacity-0 transition-all duration-1000 translate-y-10 [&.visible]:opacity-100 [&.visible]:translate-y-0 px-4 md:px-0" id="faq-section">
              <FaqSection />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-950 overflow-x-hidden text-right bg-[#f0fdf4]" dir="rtl">
      {/* Background Component */}
      <AnimatedBackground />

      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogoClick={() => navigateTo({ type: 'home' })}
      />

      <main className="flex-grow container mx-auto px-0 md:px-4 py-4 md:py-8 animate-fade-in relative z-10">
        {renderContent()}
      </main>

      <footer className="bg-white/70 backdrop-blur-3xl border-t border-emerald-100 py-12 md:py-20 mt-20 relative z-10">
        <div className="container mx-auto px-6 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 text-right">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-6 cursor-pointer" onClick={() => navigateTo({ type: 'home' })}>
                <div className="w-12 h-12 bg-white rounded-xl md:rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl shadow-emerald-500/10">
                  <img src={LOGO_URL} alt="حيفان للطاقة" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl md:text-3xl font-black text-emerald-950">حيفان للطاقة</span>
              </div>
              <p className="text-emerald-800/70 leading-relaxed max-w-md font-medium text-sm md:text-lg">
                رائدون في تقديم حلول الطاقة الشمسية المتكاملة في اليمن. نهدف إلى توفير طاقة نظيفة ومستدامة بأسعار تنافسية وجودة عالمية لعام 2026 وما بعده.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-emerald-950 mb-6 md:mb-8 text-base md:text-xl">روابط سريعة</h4>
              <ul className="space-y-3 md:space-y-4 text-emerald-800/60 font-bold text-sm md:text-base">
                <li><button onClick={() => navigateTo({ type: 'home' })} className="hover:text-emerald-700 transition-colors text-right w-full">الرئيسية</button></li>
                <li><button onClick={() => navigateTo({ type: 'story' })} className="hover:text-emerald-700 transition-colors text-right w-full">قصة نجاحنا</button></li>
                <li><button onClick={() => { navigateTo({ type: 'home' }); setTimeout(() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-emerald-700 transition-colors text-right w-full">منتجاتنا</button></li>
                <li><button onClick={() => navigateTo({ type: 'warranty' })} className="hover:text-emerald-700 transition-colors text-right w-full">سياسة الضمان</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-emerald-950 mb-6 md:mb-8 text-base md:text-xl">تواصل معنا</h4>
              <ul className="space-y-3 md:space-y-4 text-emerald-800/60 font-bold text-sm md:text-base">
                <li><a href="tel:+967784400222" className="flex items-center gap-3 hover:text-emerald-700 transition-colors text-right">اتصل بنا: <span dir="ltr" className="text-emerald-900 font-black">+967 784 400 222</span></a></li>
                <li><a href="https://wa.me/967784400333" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-emerald-700 transition-colors text-right">واتساب: <span dir="ltr" className="text-emerald-900 font-black">+967 784 400 333</span></a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-emerald-100 text-center md:text-right">
            <p className="text-emerald-800/40 text-[10px] md:text-sm font-bold">جميع الحقوق محفوظة © حيفان للطاقة المتجددة 2026</p>
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
      <FloatingContact />

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
