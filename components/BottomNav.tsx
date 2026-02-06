
import React from 'react';

interface BottomNavProps {
  activeTab: string;
  cartCount: number;
  onNavigate: (hash: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, cartCount, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', label: 'الرئيسية', hash: '#/' },
    { id: 'calc', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', label: 'الحاسبة', action: () => {
       const el = document.getElementById('solar-calculator');
       if(el) el.scrollIntoView({ behavior: 'smooth' });
    }},
    { id: 'cart', icon: 'M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z', label: 'السلة', hash: '#/cart', badge: cartCount },
    { id: 'account', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', label: 'حسابي', hash: '#/auth' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 md:hidden pb-safe-area">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = item.hash === activeTab || (activeTab === '#/' && item.id === 'home');
          return (
            <button
              key={item.id}
              onClick={() => item.action ? item.action() : onNavigate(item.hash || '#/')}
              className={`relative flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-all ${isActive ? 'bg-emerald-50 translate-y-[-2px]' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? 3 : 2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce">
                    {item.badge}
                  </span>
                )}
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

export default BottomNav;
