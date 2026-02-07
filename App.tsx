
import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { Product, UserProfile } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Header from './components/Header';
import GlassProductCard from './components/GlassProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import AiAssistant from './components/AiAssistant';
import Hero from './components/Hero';
import FaqSection from './components/FaqSection';
import ReviewSection from './components/ReviewSection';
import SolarCalculator from './components/SolarCalculator';
import FloatingContact from './components/FloatingContact';
import AnimatedBackground from './components/AnimatedBackground';
import MobileNav from './components/MobileNav';
import SEO from './components/SEO';
import LocalBusinessSchema from './components/LocalBusinessSchema';
import { useCart } from './context/CartContext';

// Lazy Load Heavy Components for Performance
const StoryModal = React.lazy(() => import('./components/StoryModal'));
const WarrantyModal = React.lazy(() => import('./components/WarrantyModal'));
const AllReviewsModal = React.lazy(() => import('./components/AllReviewsModal'));
const CheckoutView = React.lazy(() => import('./components/CheckoutView'));
const AuthSidebar = React.lazy(() => import('./components/AuthSidebar'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 backdrop-blur-sm">
    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for Floating Contact Button
  const [isContactOpen, setIsContactOpen] = useState(false);

  const homeScrollPos = useRef(0);
  const isBackAction = useRef(false);

  // Use Cart Context
  const { cart, addToCart, removeFromCart, updateQuantity, cartCount } = useCart();

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('hyfan_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validating ID format: Must contain hyphens to be a UUID.
        // If it's the old numeric Google ID, force logout to fix DB issue.
        if (parsed && parsed.id && typeof parsed.id === 'string' && parsed.id.includes('-')) {
          return parsed;
        }
        // Invalid or old ID format -> clear session
        localStorage.removeItem('hyfan_user');
        return null;
      } catch (e) {
        return null;
      }
    }
    return null;
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
          user={user} // Pass user prop here
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
        <Suspense fallback={<LoadingSpinner />}>
          <CheckoutView 
            product={product} 
            onCancel={() => navigateTo('#/')} 
            user={user} 
          />
        </Suspense>
      );
    }

    switch (hash) {
      case '#/admin':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboard user={user} onNavigate={navigateTo} />
          </Suspense>
        );
      case '#/cart':
        return (
          <CartDrawer 
            isOpen={true} 
            onClose={() => navigateTo('#/')} 
            items={cart} 
            onRemove={removeFromCart} 
            onUpdateQty={updateQuantity} 
            user={user} 
            formatPrice={formatPrice} 
          />
        );
      case '#/auth':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthSidebar isOpen={true} onClose={() => navigateTo('#/')} user={user} onUserUpdate={handleUserUpdate} />
          </Suspense>
        );
      case '#/calculator':
        return (
          <div className="pt-8 pb-32 container mx-auto px-4 animate-fade-in">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-emerald-950">حاسبة الطاقة</h2>
                <button onClick={() => navigateTo('#/')} className="text-emerald-600 font-bold text-sm">عودة للرئيسية</button>
             </div>
             <SolarCalculator />
          </div>
        );
      case '#/story':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <StoryModal onClose={() => navigateTo('#/')} />
          </Suspense>
        );
      case '#/warranty':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <WarrantyModal onClose={() => navigateTo('#/')} />
          </Suspense>
        );
      case '#/reviews':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AllReviewsModal reviews={[]} onClose={() => navigateTo('#/')} />
          </Suspense>
        );
      case '#/':
      default:
        return (
          <div className="flex flex-col gap-12 md:gap-20 pb-32 animate-fade-in">
            <SEO 
              title="الرئيسية" 
              description="متجر حيفان للطاقة المتجددة - رائدون في حلول الألواح الشمسية والبطاريات والأجهزة المنزلية الموفرة للطاقة في اليمن." 
            />
            <Hero onOpenStory={() => navigateTo('#/story')} />
            
            <section id="products-grid" className="container mx-auto px-4 scroll-mt-24">
              <div className="sticky top-14 md:top-24 z-30 bg-white/80 backdrop-blur-xl py-4 -mx-4 px-4 mb-6 border-b border-emerald-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-3xl font-black text-emerald-950">منتجاتنا المختارة</h2>
                  </div>
                  <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        type="button"
                        aria-label={`تصفح قسم ${cat}`}
                        onClick={() => { setSelectedCategory(cat); setSearchQuery(''); }} 
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap active:scale-95 ${selectedCategory === cat && searchQuery === '' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-gray-100/50 text-gray-500 hover:bg-white hover:shadow-md'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
                {filteredProducts.map(product => (
                  <GlassProductCard 
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

            <ReviewSection user={user} onShowAll={() => navigateTo('#/reviews')} />
            <FaqSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden font-sans" dir="rtl">
      {/* Global Structured Data */}
      <LocalBusinessSchema />
      
      <AnimatedBackground />
      {/* Hide Header on Admin Dashboard */}
      {currentHash !== '#/admin' && (
        <Header 
          cartCount={cartCount} 
          onOpenCart={() => navigateTo('#/cart')} 
          onOpenAuth={() => navigateTo('#/auth')} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onLogoClick={() => navigateTo('#/', true)} 
          user={user}
        />
      )}
      
      <main className="flex-grow relative z-10" role="main">
        {renderCurrentPage()}
      </main>

      {!currentHash.includes('cart') && !currentHash.includes('checkout') && !currentHash.includes('calculator') && !currentHash.includes('admin') && (
        <footer className="bg-emerald-950 text-white py-16 text-center relative z-10 pb-24 md:pb-16">
          <div className="container mx-auto px-4">
            <img src="https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg" alt="حيفان للطاقة" className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-xl border-2 border-emerald-500/30 grayscale hover:grayscale-0 transition-all" loading="lazy" />
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
      )}

      {currentHash !== '#/admin' && (
        <MobileNav 
          activeTab={currentHash} 
          cartCount={cartCount}
          onNavigate={navigateTo}
        />
      )}
      
      <AiAssistant products={products} isContactOpen={isContactOpen} />
      <FloatingContact isOpen={isContactOpen} onToggle={() => setIsContactOpen(!isContactOpen)} />
    </div>
  );
};

export default App;
