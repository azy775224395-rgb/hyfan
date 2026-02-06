
import React from 'react';
import { Home, Calculator, ShoppingCart, User, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavProps {
  activeTab: string;
  cartCount: number;
  onNavigate: (hash: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, cartCount, onNavigate }) => {
  const WHATSAPP_NUMBER = '967784400333';

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية', hash: '#/' },
    { id: 'calc', icon: Calculator, label: 'الحاسبة', hash: '#/calculator' },
    { id: 'whatsapp', icon: MessageCircle, label: 'واتساب', isFloating: true, action: handleWhatsApp },
    { id: 'cart', icon: ShoppingCart, label: 'السلة', hash: '#/cart', badge: cartCount },
    { id: 'account', icon: User, label: 'حسابي', hash: '#/auth' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-white/40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 md:hidden pb-safe-area">
      <div className="flex justify-around items-end h-20 pb-2">
        {navItems.map((item) => {
          const isActive = item.hash === activeTab || (activeTab === '#/' && item.id === 'home');
          
          if (item.isFloating) {
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="relative -top-6 group"
              >
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30 border-4 border-white text-white"
                >
                  <item.icon size={28} strokeWidth={2.5} />
                </motion.div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => item.action ? item.action() : onNavigate(item.hash || '#/')}
              className={`relative flex flex-col items-center justify-center w-16 gap-1 transition-colors duration-300 ${
                isActive ? 'text-emerald-700' : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-100/50 -translate-y-1' : ''}`}>
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge ? (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white"
                  >
                    {item.badge}
                  </motion.span>
                ) : null}
              </div>
              <span className={`text-[10px] font-black ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
