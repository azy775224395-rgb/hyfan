
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { MAIN_MENU } from '../navigationData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  searchQuery: string;
  onSearchSubmit: (query: string) => void;
  onClearSearch?: () => void;
  onLogoClick: () => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenAuth, searchQuery, onSearchSubmit, onClearSearch, onLogoClick, user }) => {
  const LOGO_URL = "https://res.cloudinary.com/dxzqizvzw/image/upload/v1779209369/IMG_%D9%A2%D9%A0%D9%A2%D9%A6%D9%A0%D9%A5%D9%A1%D9%A9_%D9%A1%D9%A9%D9%A2%D9%A5%D9%A4%D9%A2_kji9am.png";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      onSearchSubmit(localSearchQuery.trim());
    }
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    if (onClearSearch) {
      onClearSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar for Desktop */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs font-bold">
          <div className="flex gap-4">
            <span>📞 +967 784400333</span>
            <span>📍 اليمن - عدن - الشيخ عثمان</span>
          </div>
          <div className="flex gap-4">
            <a href="#/blog" className="hover:text-amber-400 transition-colors">المدونة</a>
            <a href="#/tracking" className="hover:text-amber-400 transition-colors">تتبع الطلب</a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="container mx-auto px-2 py-2 md:px-4 md:py-5 flex items-center justify-between gap-2 md:gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-700 w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo Section */}
        <div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer shrink-0"
          onClick={onLogoClick}
        >
          <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center overflow-hidden">
            <img src={LOGO_URL} alt="أبو إيفان للطاقة المتجددة" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-lg md:text-2xl font-black text-primary leading-none">
              أبو إيفان للطاقة المتجددة
            </span>
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
              Abu Evan Energy Solutions
            </span>
          </div>
        </div>

        {/* Search Bar - Desktop Centered */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-grow max-w-2xl mx-8 relative">
          <input
            type="text"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            placeholder="عن ماذا تبحث؟"
            className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-xl px-12 py-3 transition-all outline-none text-sm font-medium text-gray-700"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          {localSearchQuery && (
            <button type="button" onClick={handleClearSearch} className="absolute left-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1 transition-colors">
              <X size={18} />
            </button>
          )}
          <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
            بحث
          </button>
        </form>

        {/* Actions Section */}
        <div className="flex items-center gap-1.5 md:gap-5">
          <button 
            onClick={onOpenAuth}
            className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-gray-50">
              {user ? (
                <img src={user.avatar} className="w-8 h-8 rounded-full object-cover border border-gray-200" alt="Profile" />
              ) : (
                <User size={24} />
              )}
            </div>
          </button>

          <button 
            onClick={onOpenCart}
            className="relative flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-gray-50">
              <ShoppingCart size={22} className="md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 md:top-1 md:right-1 bg-accent text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Navigation Main Menu - Desktop ONLY */}
      <nav className="border-t border-gray-50 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 py-4">
            {MAIN_MENU.map((item, idx) => (
              <li 
                key={idx} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => item.subItems && setActiveSubMenu(item.title)}
                onMouseLeave={() => setActiveSubMenu(null)}
              >
                <a 
                  href={item.url} 
                  className="text-sm font-bold text-gray-700 hover:text-primary flex items-center gap-1 transition-colors group-hover:text-primary"
                >
                  {item.title}
                  {item.subItems && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                </a>

                {/* Dropdown Mega Menu Style */}
                {item.subItems && (
                  <AnimatePresence>
                    {activeSubMenu === item.title && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-0 w-64 bg-white shadow-xl rounded-b-xl border-t-2 border-primary overflow-hidden py-2"
                      >
                        {item.subItems.map((sub, sIdx) => (
                          <a 
                            key={sIdx}
                            href={sub.url}
                            className="block px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-primary border-b border-gray-50 last:border-0 transition-colors"
                          >
                            {sub.title}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Search Bar - Mobile ONLY (visible below logo area) */}
      <div className="md:hidden px-2 pb-2">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            placeholder="عن ماذا تبحث؟"
            className="w-full bg-gray-100 border-none focus:ring-2 focus:ring-primary/20 rounded-lg md:rounded-xl px-10 py-2 text-xs font-bold"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          {localSearchQuery && (
            <button type="button" onClick={handleClearSearch} className="absolute left-[70px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1 transition-colors">
              <X size={14} />
            </button>
          )}
          <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-md hover:bg-secondary transition-colors">
            بحث
          </button>
        </form>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <span className="font-black text-primary">القائمة</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4">
                <ul className="space-y-4">
                  {MAIN_MENU.map((item, idx) => (
                    <li key={idx} className="border-b border-gray-50 pb-4 last:border-0">
                      <div className="flex justify-between items-center mb-2">
                         <a href={item.url} onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-gray-800">{item.title}</a>
                        {item.subItems && (
                          <button onClick={() => setActiveSubMenu(activeSubMenu === item.title ? null : item.title)}>
                            <ChevronDown size={20} className={`transform transition-transform ${activeSubMenu === item.title ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      {item.subItems && activeSubMenu === item.title && (
                        <div className="bg-gray-50 rounded-lg p-2 mt-2 space-y-2">
                          {item.subItems.map((sub, sIdx) => (
                            <a 
                              key={sIdx} 
                              href={sub.url} 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2 px-3 text-sm font-bold text-gray-600 hover:text-primary"
                            >
                              {sub.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                   📍 عدن - الشيخ عثمان
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                   📞 +967 784400333
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
