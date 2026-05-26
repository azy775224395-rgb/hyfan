import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import GlassProductCard from './GlassProductCard';
import SEO from './SEO';
import BreadcrumbSchema from './BreadcrumbSchema';
import { ArrowLeft } from 'lucide-react';

interface CategoryViewProps {
  categoryName: string;
  categoryDescription?: string;
  products: Product[];
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onOrderNow: (p: Product) => void;
  formatPrice: (p: number) => string;
  onBack: () => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ 
  categoryName, 
  categoryDescription,
  products, 
  onAddToCart, 
  onViewDetails, 
  onOrderNow, 
  formatPrice,
  onBack
}) => {
  const baseUrl = window.location.origin + window.location.pathname;
  const slug = categoryName === 'الالواح الشمسيه' ? 'solar-panels'
             : categoryName === 'البطاريات' ? 'batteries'
             : categoryName === 'الانفرترات' ? 'off-grid-inverters'
             : 'latest';
             
  return (
    <div className="pt-24 pb-32 min-h-screen bg-[#f8fafc]">
      <SEO title={`قسم ${categoryName}`} description={categoryDescription || `منتجات قسم ${categoryName}`} />
      <BreadcrumbSchema 
        items={[
          { name: "الرئيسية", item: `${baseUrl}#/` },
          { name: categoryName, item: `${baseUrl}#/category/${slug}` }
        ]} 
      />
      
      <div className="container mx-auto px-4">
        {/* Header Options */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
             <button 
               onClick={onBack}
               className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-4 font-bold text-sm transition-colors"
             >
                <ArrowLeft size={16} className="rtl:rotate-180" />
                عودة للرئيسية
             </button>
             <h1 className="text-3xl md:text-4xl font-black text-emerald-950">
               {categoryName}
             </h1>
             {categoryDescription && (
                <p className="text-gray-500 mt-2">{categoryDescription}</p>
             )}
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm font-bold text-gray-600">
            {products.length} منتج
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {products.map(product => (
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
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
             <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
               إنفرترات
             </div> {/* Generic Icon / placeholder */}
             <p className="text-gray-500 font-bold text-lg">لا توجد منتجات في هذا القسم حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
