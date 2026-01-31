
import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import AiAssistant from './components/AiAssistant';
import Hero from './components/Hero';

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#product-')) {
      const id = hash.replace('#product-', '');
      const found = products.find(p => p.id === id);
      if (found) setSelectedProduct(found);
    }
  }, [products]);

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
      const matchesCategory = selectedCategory === 'الكل' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const categories = ['الكل', ...Array.from(new Set(products.map(p => p.category)))];

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    window.location.hash = `product-${product.id}`;
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Hero />

        <div className="flex gap-2 overflow-x-auto pb-8 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-bold text-sm ${
                selectedCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-white text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200 mt-8">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <p className="text-gray-400 text-lg">لا توجد منتجات تطابق بحثك حالياً.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2-2.1 3.5-5.5 8.8-9 8.8Zm-1-12c-2.5 0-4.5 2-4.5 4.5"/></svg>
             </div>
             <h2 className="text-2xl font-black text-gray-900">حيفان للطاقة المتجدّدة</h2>
             <p className="text-gray-500 max-w-sm leading-relaxed">نوفر أجود أنواع الألواح الشمسية والبطاريات والمنظومات الكهربائية المتكاملة لخدمتكم في كافة أنحاء اليمن.</p>
          </div>
          <p className="text-gray-400 text-xs mt-10">© 2025 حيفان للطاقة المتجددة. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={handleCloseDetail}
          onAddToCart={addToCart}
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />

      <AiAssistant products={products} />
    </div>
  );
};

export default App;
