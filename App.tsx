
import React, { useState, useMemo, useEffect } from 'react';
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

// تعريف الحالات الأساسية فقط لضمان عدم حدوث أخطاء توجيه
type PageType = 'home' | 'product' | 'checkout';

const App: React.FC = () => {
  // الحالة الأساسية
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // حالات النوافذ المنبثقة (لا تؤثر على الصفحة الأساسية)
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState<Review[] | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('hyfan_user');
    return saved ? JSON.parse(saved) : null;
  });

  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  // معالجة التنقل البسيط
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const id = hash.replace('#product-', '');
        const p = products.find(prod => prod.id === id);
        if (p) {
          setSelectedProduct(p);
          setActivePage('product');
          return;
        }
      }
      // أي هاش آخر أو عدم وجود هاش يوجه للرئيسية فوراً
      setActivePage('home');
      setSelectedProduct(null);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [products]);

  // العودة للأعلى عند تغيير الصفحة
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage, selectedProduct]);

  const handleUserUpdate = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem('hyfan_user', JSON.stringify(newUser));
    setIsAuthOpen(false);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
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

  const navigateToHome = () => {
    window.location.hash = '';
    setActivePage('home');
    setSelectedProduct(null);
  };

  const navigateToProduct = (p: Product) => {
    window.location.hash = `product-${p.id}`;
  };

  const navigateToCheckout = (p: Product) => {
    setSelectedProduct(p);
    setActivePage('checkout');
  };

  // محتوى الصفحة الرئيسية
  const renderHome = () => (
    <div className="flex flex-col gap-12 md:gap-20 pb-20 animate-fade-in">
      <Hero onOpenStory={() => setIsStoryOpen(true)} />
      
      <div id="products-grid" className="container mx-auto px-4 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-emerald-100 pb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-emerald-950">منتجاتنا المختارة</h2>
            <p className="text-emerald-600 font-bold mt-1">أفضل جودة بأفضل سعر في اليمن</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => { setSelectedCategory(cat); setSearchQuery(''); }} 
                className={`px-6 py-2 rounded-full text-xs font-black border-2 transition-all whitespace-nowrap ${selectedCategory === cat && searchQuery === '' ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' : 'bg-white text-emerald-800 border-emerald-50 hover:border-emerald-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
              onViewDetails={navigateToProduct} 
              onOrderNow={navigateToCheckout} 
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4"><SolarCalculator /></div>
      <div className="container mx-auto px-4">
        <ReviewSection onShowAll={(reviews) => setReviewsToShow(reviews)} />
      </div>
      <BrandSection />
      <div className="container mx-auto px-4"><FaqSection /></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden" dir="rtl">
      <AnimatedBackground />
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAuth={() => setIsAuthOpen(true)} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onLogoClick={navigateToHome} 
        user={user} 
      />
      
      <main className="flex-grow relative z-10">
        {activePage === 'home' && renderHome()}
        {activePage === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={navigateToHome} 
            onAddToCart={addToCart} 
            onOrderNow={navigateToCheckout} 
          />
        )}
        {activePage === 'checkout' && selectedProduct && (
          <CheckoutView 
            product={selectedProduct} 
            onCancel={navigateToHome} 
            user={user} 
          />
        )}
      </main>

      <footer className="bg-emerald-950 text-white py-16 text-center relative z-10">
        <div className="container mx-auto px-4">
          <img src={LOGO_URL} alt="حيفان" className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-xl border-2 border-emerald-500/30" />
          <h3 className="text-xl font-black mb-2">حيفان للطاقة المتجددة</h3>
          <p className="text-emerald-400 font-bold text-sm mb-8 opacity-80">شريككم الموثوق للطاقة النظيفة في اليمن</p>
          
          <div className="flex justify-center gap-8 mb-12">
            <button onClick={() => setIsStoryOpen(true)} className="text-sm font-bold text-white/60 hover:text-emerald-400 transition-colors">من نحن</button>
            <button onClick={() => setIsWarrantyOpen(true)} className="text-sm font-bold text-white/60 hover:text-emerald-400 transition-colors">سياسة الضمان</button>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-sm font-bold text-white/60 hover:text-emerald-400 transition-colors">الرجوع للأعلى</button>
          </div>
          
          <div className="pt-8 border-t border-white/5">
            <p className="text-[10px] font-bold text-white/30 tracking-widest uppercase">© 2026 حيفان للطاقة المتجددة - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>

      {/* Modals - Always independent of routing */}
      {isStoryOpen && <StoryModal onClose={() => setIsStoryOpen(false)} />}
      {isWarrantyOpen && <WarrantyModal onClose={() => setIsWarrantyOpen(false)} />}
      {reviewsToShow && <AllReviewsModal reviews={reviewsToShow} onClose={() => setReviewsToShow(null)} />}
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} onUpdateQty={updateQuantity} user={user} />
      <AuthSidebar isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} user={user} onUserUpdate={handleUserUpdate} />
      <AiAssistant products={products} isContactOpen={isContactOpen} />
      <FloatingContact isOpen={isContactOpen} onToggle={() => setIsContactOpen(!isContactOpen)} />
    </div>
  );
};

export default App;
