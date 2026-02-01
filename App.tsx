
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
    // تمرير سريع ومباشر عند تغيير الصفحة
    window.scrollTo(0, 0);
  }, [activeView]);

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
    const query = searchQuery.toLowerCase();
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(query) || 
                           p.description.toLowerCase().includes(query);
      const matchesCategory = p.category === selectedCategory;
      return matchesSearch && (selectedCategory ? matchesCategory : true);
    });
  }, [products, searchQuery, selectedCategory]);

  const navigateTo = (view: ViewState) => {
    setActiveView(view);
  };

  const renderContent = () => {
    switch (activeView.type) {
      case 'product':
        return (
          <div className="bg-white/90 backdrop-blur rounded-[1.5rem] md:rounded-[3rem] border border-white shadow-xl p-4 md:p-8">
            <ProductDetail 
              product={activeView.product} 
              onClose={() => navigateTo({ type: 'home' })}
              onAddToCart={addToCart}
            />
          </div>
        );
      case 'story':
        return <StoryModal onClose={() => navigateTo({ type: 'home' })} />;
      case 'warranty':
        return <WarrantyModal onClose={() => navigateTo({ type: 'home' })} />;
      case 'home':
      default:
        return (
          <div className="flex flex-col gap-8 md:gap-16">
            <Hero onOpenStory={() => navigateTo({ type: 'story' })} />
            
            {/* Products Grid - Optimized for speed */}
            <div className="px-4 md:px-0" id="products-grid">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="p-3 md:p-5 rounded-2xl bg-emerald-100/40 border border-white inline-block">
                  <h2 className="text-lg md:text-3xl font-black text-emerald-950 leading-none">منتجاتنا المختارة</h2>
                  <p className="text-emerald-700 mt-1 font-bold text-[10px] md:text-xs">حلول طاقة ذكية 2026</p>
                </div>
                
                <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-sm font-black transition-all whitespace-nowrap border-2 ${
                        selectedCategory === cat 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                        : 'bg-white text-emerald-800 border-emerald-50 hover:border-emerald-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
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
                <div className="text-center py-12 bg-white/50 rounded-3xl border border-dashed border-emerald-200">
                  <p className="font-bold text-emerald-900">لا توجد نتائج مطابقة لبحثك</p>
                </div>
              )}
            </div>

            {/* Sub-sections with simple display */}
            <div className="px-4 md:px-0"><SolarCalculator /></div>
            <div className="px-4 md:px-0"><ReviewSection /></div>
            <div><BrandSection /></div>
            <div className="px-4 md:px-0" id="faq-section"><FaqSection /></div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden text-right bg-[#f0fdf4]" dir="rtl">
      <AnimatedBackground />

      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogoClick={() => navigateTo({ type: 'home' })}
      />

      <main className="flex-grow container mx-auto py-4 md:py-6 relative z-10">
        {renderContent()}
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-emerald-50 py-10 mt-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => navigateTo({ type: 'home' })}>
                <img src={LOGO_URL} alt="حيفان" className="w-10 h-10 rounded-xl shadow-lg object-cover" />
                <span className="text-xl md:text-2xl font-black text-emerald-950">حيفان للطاقة</span>
              </div>
              <p className="text-emerald-800/70 text-xs md:text-base max-w-sm">
                نقدم أفضل حلول الطاقة المتجددة في اليمن بأعلى معايير الجودة العالمية لعام 2026.
              </p>
            </div>
            
            <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-8">
              <div>
                <h4 className="font-black text-emerald-950 mb-4 text-sm md:text-lg">روابط</h4>
                <ul className="space-y-2 text-emerald-800/60 font-bold text-[10px] md:text-sm">
                  <li><button onClick={() => navigateTo({ type: 'home' })}>الرئيسية</button></li>
                  <li><button onClick={() => navigateTo({ type: 'story' })}>قصتنا</button></li>
                  <li><button onClick={() => navigateTo({ type: 'warranty' })}>الضمان</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-emerald-950 mb-4 text-sm md:text-lg">تواصل</h4>
                <ul className="space-y-2 text-emerald-800/60 font-bold text-[10px] md:text-sm">
                  <li><a href="tel:+967784400222">784 400 222</a></li>
                  <li><a href="https://wa.me/967784400333">واتساب</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-emerald-50 text-center">
            <p className="text-emerald-800/30 text-[9px] md:text-xs font-bold">© 2026 حيفان للطاقة المتجددة</p>
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
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default App;
