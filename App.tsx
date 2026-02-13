import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, UserProfile } from './types';
import { LocalDataService } from './services/localDataService'; // Import Service
import Header from './components/Header';
// Hero and GlassProductCard kept eager for LCP (Largest Contentful Paint) optimization
import Hero from './components/Hero';
import OffersBar from './components/OffersBar';
import WeeklyOffers from './components/WeeklyOffers';
import GlassProductCard from './components/GlassProductCard';
import AnimatedBackground from './components/AnimatedBackground';
import MobileNav from './components/MobileNav';
import SEO from './components/SEO';
import LocalBusinessSchema from './components/LocalBusinessSchema';
import { useCart } from './context/CartContext';
import { Sun, Battery, Zap, Tv, Flame, Package, LayoutGrid, AlertTriangle } from 'lucide-react';

// --- Step 1: Lazy Load Heavy Page/Section Components ---
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const CartDrawer = React.lazy(() => import('./components/CartDrawer'));
const FaqSection = React.lazy(() => import('./components/FaqSection'));
const ReviewSection = React.lazy(() => import('./components/ReviewSection'));
const SolarCalculator = React.lazy(() => import('./components/SolarCalculator'));
const StoryModal = React.lazy(() => import('./components/StoryModal'));
const WarrantyModal = React.lazy(() => import('./components/WarrantyModal'));
const AllReviewsModal = React.lazy(() => import('./components/AllReviewsModal'));
const CheckoutView = React.lazy(() => import('./components/CheckoutView'));
const AuthSidebar = React.lazy(() => import('./components/AuthSidebar'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const FloatingContact = React.lazy(() => import('./components/FloatingContact'));

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 backdrop-blur-sm">
    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
  </div>
);

// Helper to map category names to icons
const getCategoryIcon = (category: string) => {
  if (category === 'الكل') return <LayoutGrid size={18} />;
  if (category.includes('الالواح') || category.includes('شمسية')) return <Sun size={18} />;
  if (category.includes('البطاريات')) return <Battery size={18} />;
  if (category.includes('الانفرترات')) return <Zap size={18} />;
  if (category.includes('الاجهزة') || category.includes('كهربائية')) return <Tv size={18} />;
  if (category.includes('الطباخه')) return <Flame size={18} />;
  if (category.includes('الباقات')) return <Package size={18} />;
  return <LayoutGrid size={18} />;
};

const App: React.FC = () => {
  // Load products from LocalDataService instead of constant directly
  const [products, setProducts] = useState<Product[]>([]);
  const [clientIP, setClientIP] = useState<string>('');
  const [isBanned, setIsBanned] = useState(false);
  
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('hyfan_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && typeof parsed.id === 'string' && parsed.id.includes('-')) {
          return parsed as UserProfile;
        }
        localStorage.removeItem('hyfan_user');
        return null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // --- Security & Tracking Logic ---
  useEffect(() => {
    // 1. Fetch Real IP
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = (await response.json()) as { ip: string };
        const ip = data.ip;
        setClientIP(ip);
        
        // 2. Check Ban Status
        if (LocalDataService.isBanned(ip)) {
          setIsBanned(true);
        } else {
          // 3. Start Session Heartbeat (Only if not banned)
          // Initial Update
          LocalDataService.updateSessionHeartbeat(ip, user?.email, user?.name);
          
          // Interval Update (Every 30 seconds)
          const interval = setInterval(() => {
             LocalDataService.updateSessionHeartbeat(ip, user?.email, user?.name);
          }, 30000);
          
          return () => clearInterval(interval);
        }
      } catch (error: any) {
        console.error("Failed to fetch IP", error);
      }
    };
    fetchIP();
  }, [user]);

  useEffect(() => {
    const loadProducts = () => {
       setProducts(LocalDataService.getProducts());
    };
    loadProducts();

    // Listen for updates from Admin Dashboard
    window.addEventListener('products-updated', loadProducts);
    return () => window.removeEventListener('products-updated', loadProducts);
  }, []);

  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل'); // State for selected category
  
  // State for Floating Contact Button
  const [isContactOpen, setIsContactOpen] = useState(false);

  const homeScrollPos = useRef(0);
  const isBackAction = useRef(false);

  // Use Cart Context
  const { cart, addToCart, removeFromCart, updateQuantity, cartCount } = useCart();

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

  // Extract unique categories in order + "All"
  const categories = useMemo(() => {
    // Predefined order for better UX
    const preferredOrder = ['الالواح الشمسيه', 'البطاريات', 'الانفرترات', 'الاجهزة الكهربائيه', 'اجهزة الطباخه', 'الباقات'];
    const availableCategories = Array.from(new Set(products.map(p => p.category)));
    
    const sortedCats = [
      ...preferredOrder.filter(c => availableCategories.includes(c)),
      ...availableCategories.filter(c => !preferredOrder.includes(c))
    ];
    
    return ['الكل', ...sortedCats];
  }, [products]);

  // Filter products based on search or selected category
  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }

    // 2. Filter by Category (if no search)
    if (selectedCategory !== 'الكل') {
      result = result.filter(p => p.category === selectedCategory);
    }

    return result;
  }, [products, searchQuery, selectedCategory]);

  const renderCurrentPage = () => {
    const hash = currentHash;

    if (hash.startsWith('#/product/')) {
      const id = hash.replace('#/product/', '');
      const product = products.find(p => p.id === id);
      if (product) return (
        <Suspense fallback={<LoadingSpinner />}>
          <ProductDetail 
            product={product} 
            user={user}
            onClose={() => navigateTo('#/')} 
            onAddToCart={addToCart} 
            onOrderNow={(p) => navigateTo(`#/checkout/${p.id}`)} 
            formatPrice={formatPrice}
          />
        </Suspense>
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
          <Suspense fallback={<LoadingSpinner />}>
            <CartDrawer 
              isOpen={true} 
              onClose={() => navigateTo('#/')} 
              items={cart} 
              onRemove={removeFromCart} 
              onUpdateQty={updateQuantity} 
              user={user} 
              formatPrice={formatPrice} 
            />
          </Suspense>
        );
      case '#/auth':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthSidebar isOpen={true} onClose={() => navigateTo('#/')} user={user} onUserUpdate={handleUserUpdate} />
          </Suspense>
        );
      case '#/calculator':
        return (
          <div className="pt-8 pb-32 container mx-auto px-4">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-emerald-950">حاسبة الطاقة</h2>
                <button onClick={() => navigateTo('#/')} className="text-emerald-600 font-bold text-sm">عودة للرئيسية</button>
             </div>
             <Suspense fallback={<div className="h-64 bg-gray-100 rounded-3xl animate-pulse" />}>
               <SolarCalculator />
             </Suspense>
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
          <div className="flex flex-col gap-0 pb-32">
            <SEO 
              title="الرئيسية" 
              description="متجر حيفان للطاقة المتجددة - رائدون في حلول الألواح الشمسية والبطاريات والأجهزة المنزلية الموفرة للطاقة في اليمن." 
            />
            <Hero onOpenStory={() => navigateTo('#/story')} />
            
            {/* Added Offers Bar here */}
            <OffersBar />

            {/* Added Weekly Offers Section (Only on Home) */}
            <WeeklyOffers 
               products={products}
               onAddToCart={addToCart}
               onViewDetails={(p) => navigateTo(`#/product/${p.id}`)}
               formatPrice={formatPrice}
            />
            
            {/* Category Filter Bar (Sticky) */}
            {!searchQuery && (
              <div className="sticky top-16 md:top-24 z-30 bg-[#f8fafc]/95 backdrop-blur-xl border-b border-gray-200/50 py-4 shadow-sm">
                <div className="container mx-auto px-4 overflow-x-auto scrollbar-hide">
                  <div className="flex gap-3 min-w-max pb-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`
                          flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black transition-all duration-300
                          ${selectedCategory === cat 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-105' 
                            : 'bg-white text-gray-500 border border-gray-200 hover:border-emerald-200 hover:text-emerald-600'}
                        `}
                      >
                        {getCategoryIcon(cat)}
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <section id="products-grid" className="container mx-auto px-4 pt-8 min-h-[500px]">
               {searchQuery && (
                 <h2 className="text-xl font-black text-emerald-950 mb-6">نتائج البحث عن "{searchQuery}"</h2>
               )}

               {filteredProducts.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
                  >
                    <AnimatePresence mode="popLayout">
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
                    </AnimatePresence>
                  </motion.div>
               ) : (
                  <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                     <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🔍</div>
                     <p className="text-gray-400 font-bold text-lg">
                       {searchQuery ? 'لا توجد نتائج مطابقة لبحثك' : 'لا توجد منتجات في هذا القسم حالياً'}
                     </p>
                     {!searchQuery && (
                       <button onClick={() => setSelectedCategory('الكل')} className="mt-4 text-emerald-600 font-bold hover:underline">عرض كل المنتجات</button>
                     )}
                  </div>
               )}
            </section>

            <div className="mt-16">
              <Suspense fallback={<div className="h-64 bg-gray-50/50 rounded-3xl" />}>
                <ReviewSection user={user} onShowAll={() => navigateTo('#/reviews')} />
              </Suspense>
            </div>

            <Suspense fallback={null}>
              <FaqSection />
            </Suspense>
          </div>
        );
    }
  };

  // --- Banned View ---
  if (isBanned) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle size={64} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black text-white mb-4">تم حظر الوصول</h1>
        <p className="text-gray-400 font-bold mb-8 max-w-md">
          عذراً، تم حظر عنوان IP الخاص بك ({clientIP}) من الوصول إلى هذا الموقع بسبب انتهاك شروط الاستخدام.
        </p>
        <p className="text-xs text-gray-600">ID: {window.btoa(String(clientIP || 'unknown'))}</p>
      </div>
    );
  }

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
        <footer className="bg-emerald-950 text-white py-16 text-center relative z-10 pb-24 md:pb-16 mt-auto">
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
      
      <Suspense fallback={null}>
        <FloatingContact isOpen={isContactOpen} onToggle={() => setIsContactOpen(!isContactOpen)} />
      </Suspense>
    </div>
  );
};

export default App;