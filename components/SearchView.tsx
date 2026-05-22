import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import GlassProductCard from './GlassProductCard';
import { customSearch } from '../lib/searchUtils';

interface SearchViewProps {
  products: Product[];
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onOrderNow: (product: Product) => void;
  formatPrice: (price: number) => string;
}

const SearchView: React.FC<SearchViewProps> = ({ 
  products, 
  searchQuery, 
  onAddToCart,
  onViewDetails,
  onOrderNow,
  formatPrice
}) => {
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p => {
      const matchesSearch = customSearch(searchQuery, p.name || '') || customSearch(searchQuery, p.description || '');
      return matchesSearch;
    });
  }, [products, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl md:text-3xl font-black text-primary">نتائج البحث</h2>
        <p className="text-gray-500 mt-2 font-bold text-sm">
          {searchQuery ? `البحث عن: "${searchQuery}"` : 'يرجى إدخال كلمة للبحث'}
        </p>
      </div>

      {searchQuery.trim() ? (
        filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 lg:gap-8 px-1 md:px-0"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <GlassProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  onOrderNow={onOrderNow}
                  formatPrice={formatPrice}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100 mt-8">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <p className="text-gray-500 text-xl font-bold">لا توجد منتجات تطابق بحثك حالياً.</p>
            <p className="text-gray-400 mt-2">يرجى المحاولة بكلمات أخرى أو تصفح الأقسام.</p>
          </div>
        )
      ) : (
        <div className="text-center py-20 text-gray-500 font-bold">
          أدخل كلمة للبحث في شريط البحث أعلاه
        </div>
      )}
    </div>
  );
};

export default SearchView;
