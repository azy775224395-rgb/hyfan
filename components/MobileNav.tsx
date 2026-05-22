
import React from 'react';
import { Home, LayoutGrid, ShoppingCart, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavProps {
  activeTab: string;
  cartCount: number;
  onNavigate: (hash: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, cartCount, onNavigate }) => {

  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية', hash: '#/' },
    { id: 'categories', icon: LayoutGrid, label: 'الاقسام', action: () => onNavigate('#/categories') },
    { id: 'cart', icon: ShoppingCart, label: 'السلة', isFloating: true, action: () => onNavigate('#/cart'), badge: cartCount },
    { id: 'search', icon: Search, label: 'البحث', action: () => {
      // Small trick to scroll to top where search usually is
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const searchInput = document.querySelector('input[type="text"]');
      if (searchInput) (searchInput as HTMLElement).focus();
    } },
    { id: 'account', icon: User, label: 'حسابي', hash: '#/auth' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white backdrop-blur-lg border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 md:hidden pb-safe-area">
      <div className="relative flex justify-between items-end h-16 pb-1 px-4">
        {/* Left area: items 0 and 1 */}
        <div className="flex justify-between w-[38%]">
          {navItems.slice(0, 2).map((item) => {
            const isActive = item.hash === activeTab || (activeTab === '#/' && item.id === 'home');
            return (
              <button
                key={item.id}
                onClick={() => item.action ? item.action() : onNavigate(item.hash || '#/')}
                className={`flex flex-col items-center justify-center w-14 gap-1 transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[9px] font-bold ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Center Floating Action Button: item 2 */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-1/5 flex justify-center">
          <button
            onClick={navItems[2].action}
            className="relative group focus:outline-none"
          >
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 border-4 border-white text-white"
            >
              <ShoppingCart size={24} strokeWidth={2.5} />
            </motion.div>
            {navItems[2].badge ? (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 h-4 min-w-[16px] px-1 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm"
              >
                {navItems[2].badge}
              </motion.span>
            ) : null}
          </button>
        </div>

        {/* Right area: items 3 and 4 */}
        <div className="flex justify-between w-[38%]">
          {navItems.slice(3, 5).map((item) => {
            const isActive = item.hash === activeTab || (activeTab === '#/' && item.id === 'home');
            return (
              <button
                key={item.id}
                onClick={() => item.action ? item.action() : onNavigate(item.hash || '#/')}
                className={`flex flex-col items-center justify-center w-14 gap-1 transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[9px] font-bold ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
