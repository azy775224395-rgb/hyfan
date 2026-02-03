
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

type ViewState = 
  | { type: 'home' }
  | { type: 'product'; product: Product }
  | { type: 'story' }
  | { type: 'warranty' }
  | { type: 'all-reviews'; reviews: Review[] }
  | { type: 'checkout'; product: Product };

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('hyfan_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeView, setActiveView] = useState<ViewState>({ type: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

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

  const navigateTo = (view: ViewState) => setActiveView(view);

  const renderContent = () => {
    switch (activeView.type) {
      case 'product':
        return <ProductDetail product={activeView.product} onClose={() => navigateTo({ type: 'home' })} onAddToCart={addToCart} onOrderNow={(p) => navigateTo({ type: 'checkout', product: p })} />;
      case 'checkout':
        return <CheckoutView product={activeView.product} onCancel={() => navigateTo({ type: 'home' })} user={user} />;
      case 'all-reviews':
        return <AllReviewsModal reviews={activeView.reviews} onClose={() => navigateTo({ type: 'home' })} />;
      case 'story':
        return <StoryModal onClose={() => navigateTo({ type: 'home' })} />;
      case 'warranty':
        return <WarrantyModal onClose={() => navigateTo({ type: 'home' })} />;
      case 'home':
      default:
        return (
          <div className="flex flex-col gap-10 md:gap-24">
            <Hero onOpenStory={() => navigateTo({ type: 'story' })} />
            <div id="products-grid">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 px-4">
                <div className="p-4 md:p-6 rounded-[2rem] bg-emerald-100/40 border border-white inline-block">
                  <h2 className="text-xl md:text-4xl font-black text-emerald-950">منتجاتنا المختارة</h2>
                  <p className="text-emerald-700 mt-2 font-bold text-xs">حلول طاقة ذكية 2026</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setSearchQuery(''); }} className={`px-6 py-2.5 rounded-full text-[11px] md:text-sm font-black border-2 transition-all whitespace-nowrap ${selectedCategory === cat && searchQuery === '' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl' : 'bg-white text-emerald-800 border-emerald-50'}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 px-4">
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetails={(p) => navigateTo({ type: 'product', product: p })} onOrderNow={(p) => navigateTo({ type: 'checkout', product: p })} />)}
              </div>
            </div>
            <SolarCalculator />
            <ReviewSection onShowAll={(reviews) => navigateTo({ type: 'all-reviews', reviews })} />
            <BrandSection />
            <FaqSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-right bg-[#f0fdf4]" dir="rtl">
      <AnimatedBackground />
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onLogoClick={() => navigateTo({ type: 'home' })} user={user} />
      <main className="flex-grow container mx-auto py-6 md:py-12 relative z-10">{renderContent()}</main>
      <footer className="bg-white/80 backdrop-blur-md border-t border-emerald-50 py-16 mt-20 text-center">
        <img src={LOGO_URL} alt="حيفان" className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-lg" />
        <p className="text-emerald-800/70 text-sm md:text-lg font-bold mb-8 tracking-widest uppercase">© 2026 حيفان للطاقة المتجددة</p>
      </footer>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} onUpdateQty={updateQuantity} />
      <AuthSidebar isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} user={user} onUserUpdate={handleUserUpdate} />
      <AiAssistant products={products} isContactOpen={isContactOpen} />
      <FloatingContact isOpen={isContactOpen} onToggle={() => setIsContactOpen(!isContactOpen)} />
    </div>
  );
};

export default App;
