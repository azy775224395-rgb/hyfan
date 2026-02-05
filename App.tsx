
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product, CartItem, Review, UserProfile } from './types';
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
import AllReviewsModal from './components/AllReviewsModal';
import CheckoutView from './components/CheckoutView';
import AuthSidebar from './components/AuthSidebar';

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [searchQuery, setSearchQuery] = useState('');
  
  const homeScrollPos = useRef(0);
  const isBackAction = useRef(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('hyfan_user');
    return saved ? JSON.parse(saved) : null;
  });

  const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=حيفان+للطاقة+المتجددة+اليمن';

  useEffect(() => {
    const onHashChange = () => {
      const newHash = window.location.hash || '#/';
      if (currentHash === '#/') homeScrollPos.current = window.scrollY;
      setCurrentHash(newHash);
      if (newHash === '#/') {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: homeScrollPos.current,
            behavior: isBackAction.current ? 'instant' : 'smooth'
          });
          isBackAction.current = false;
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [currentHash]);

  const navigateTo = (hash: string, resetScroll = false) => {
    if (hash === '#/') isBackAction.current = true;
    if (resetScroll && hash === '#/') homeScrollPos.current = 0;
    window.location.hash = hash;
  };

  const handleUserUpdate = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem('hyfan_user', JSON.stringify(newUser));
    navigateTo('#/');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    navigateTo('#/cart');
  };

  // وظيفة تنسيق السعر مبسطة لتكون بالريال السعودي فقط
  const formatPrice = (sarPrice: number) => {
    return `${sarPrice} ر.س`;
  };

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter(p => {
      const isSearchMatch = q === '' || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const isCategoryMatch = selectedCategory ? p.category === selectedCategory : true;
      return isSearchMatch && (q !== '' ? true : isCategoryMatch);
    });
  }, [products, searchQuery, selectedCategory]);

  const renderCurrentPage = () => {
    const hash = currentHash;

    if (hash.startsWith('#/product/')) {
      const id = hash.replace('#/product/', '');
      const product = products.find(p => p.id === id);
      if (product) return (
        <ProductDetail 
          product={product} 
          onClose={() => navigateTo('#/')} 
          onAddToCart={addToCart} 
          onOrderNow={(p) => navigateTo(`#/checkout/${p.id}`)} 
          formatPrice={formatPrice}
        />
      );
    }

    if (hash.startsWith('#/checkout/')) {
      const id = hash.replace('#/checkout/', '');
      const product = products.find(p => p.id === id);
      if (product) return (
        <CheckoutView 
          product={product} 
          onCancel={() => navigateTo('#/')} 
          user={user} 
        />
      );
    }

    switch (hash) {
      case '#/cart':
        return (
          <CartDrawer 
            isOpen={true} 
            onClose={() => navigateTo('#/')} 
            items={cart} 
            onRemove={(id) => setCart(prev => prev.filter(item => item.id !== id))} 
            onUpdateQty={(id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))} 
            user={user} 
            formatPrice={formatPrice} 
          />
        );
      case '#/auth':
        return <AuthSidebar isOpen={true} onClose={() => navigateTo('#/')} user={user} onUserUpdate={handleUserUpdate} />;
      case '#/story':
        return <StoryModal onClose={() => navigateTo('#/')} />;
      case '#/warranty':
        return <WarrantyModal onClose={() => navigateTo('#/')} />;
      case '#/reviews':
        return <AllReviewsModal reviews={[]} onClose={() => navigateTo('#/')} />;
      case '#/':
      default:
        return (
          <div className="flex flex-col gap-12 md:gap-20 pb-20 animate-fade-in">
            <Hero onOpenStory={() => navigateTo('#/story')} />
            
            <section id="products-grid" className="container mx-auto px-4 scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-emerald-100 pb-8">
                <div>
                  <h2 className="text-2xl md:text-4xl font-black text-emerald-950 underline decoration-emerald-500 decoration-4 underline-offset-8">منتجاتنا المختارة</h2>
                  <p className="text-emerald-600 font-bold mt-4">أفضل جودة بأفضل سعر في اليمن 2026</p>
                </div>
                <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      type="button"
                      onClick={() => { setSelectedCategory(cat); setSearchQuery(''); }} 
                      className={`px-6 py-2 rounded-full text-xs font-black border-2 transition-all whitespace-nowrap ${selectedCategory === cat && searchQuery === '' ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' : 'bg-white text-emerald-800 border-emerald-50 hover:border-emerald-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                    onViewDetails={(p) => navigateTo(`#/product/${p.id}`)} 
                    onOrderNow={(p) => navigateTo(`#/checkout/${p.id}`)} 
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </section>

            <SolarCalculator />
            <ReviewSection user={user} onShowAll={() => navigateTo('#/reviews')} />
            <BrandSection />
            <FaqSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden" dir="rtl">
      <AnimatedBackground />
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => navigateTo('#/cart')} 
        onOpenAuth={() => navigateTo('#/auth')} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onLogoClick={() => navigateTo('#/', true)} 
        user={user}
      />
      
      <main className="flex-grow relative z-10" role="main">
        {renderCurrentPage()}
      </main>

      <footer className="bg-emerald-950 text-white py-16 text-center relative z-10">
        <div className="container mx-auto px-4">
          <img src="https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg" alt="حيفان للطاقة" className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-xl border-2 border-emerald-500/30" loading="lazy" />
          <h3 className="text-xl font-black mb-2">حيفان للطاقة المتجددة</h3>
          <p className="text-emerald-400 font-bold text-sm mb-8 opacity-80">شريككم الموثوق للطاقة النظيفة في اليمن</p>
          
          <nav className="flex justify-center gap-8 mb-12">
            <button type="button" onClick={() => navigateTo('#/story')} className="text-sm font-bold text-white/60 hover:text-emerald-400 transition-colors">من نحن</button>
            <button type="button" onClick={() => navigateTo('#/warranty')} className="text-sm font-bold text-white/60 hover:text-emerald-400 transition-colors">سياسة الضمان</button>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white/60 hover:text-emerald-400 transition-colors">موقعنا على الخريطة</a>
          </nav>
          
          <div className="pt-8 border-t border-white/5">
            <p className="text-[10px] font-bold text-white/30 tracking-widest uppercase">© 2026 حيفان للطاقة المتجددة - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>

      <AiAssistant products={products} />
      <FloatingContact isOpen={false} onToggle={() => {}} />
    </div>
  );
};

export default App;
