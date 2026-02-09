
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onLogoClick: () => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenAuth, searchQuery, setSearchQuery, onLogoClick, user }) => {
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";
  const ADMIN_EMAIL = "azy775224395@gmail.com";

  // فحص الأدمن بشكل دقيق (بدون حساسيه لحالة الأحرف)
  const isAdmin = user && user.email && (user.email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase());

  return (
    <header className="sticky top-0 z-40 w-full bg-white/60 backdrop-blur-2xl border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-3 h-16 md:h-24 flex items-center justify-between gap-2 md:gap-6">
        {/* Logo Section */}
        <div 
          className="relative flex items-center gap-2 group cursor-pointer shrink-0"
          onClick={onLogoClick}
        >
          <div className="relative w-9 h-9 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-md border border-gray-100 group-hover:scale-105 transition-transform duration-500">
            <img src={LOGO_URL} alt="حيفان للطاقة" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm md:text-2xl font-black text-emerald-950 leading-none">
              حيفان للطاقة
            </span>
            <div className="flex items-center gap-2 mt-0.5 md:mt-1">
              <span className="text-[8px] md:text-[11px] font-bold text-emerald-600 hidden sm:block tracking-wide uppercase">
                Energy Solutions
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl flex items-center gap-2 md:gap-4 mx-2">
          <div className="flex-grow relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-white border border-gray-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-300 rounded-full md:rounded-2xl px-4 py-2.5 md:px-6 md:py-3.5 transition-all outline-none text-xs md:text-sm font-bold text-gray-700 placeholder:text-gray-400 shadow-sm"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          
          {/* Admin Button - يظهر دائماً للأدمن */}
          {isAdmin && (
            <button
              onClick={() => window.location.hash = '#/admin'}
              className="flex items-center gap-1.5 bg-emerald-950 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-black text-[10px] md:text-xs hover:bg-black transition-colors shadow-lg animate-fade-in border border-emerald-800"
            >
              <span>⚙️</span>
              <span className="hidden md:inline">الإدارة</span>
            </button>
          )}

          <button 
            onClick={onOpenAuth}
            className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-emerald-800 hover:text-emerald-600 bg-white hover:bg-emerald-50 rounded-full md:rounded-2xl transition-all border border-gray-200 hover:border-emerald-200 shadow-sm"
          >
            {user ? (
              <img src={user.avatar} className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover" alt="Profile" />
            ) : (
              <svg className="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            )}
          </button>

          <button 
            onClick={onOpenCart}
            className="relative w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-emerald-800 hover:text-emerald-600 bg-white hover:bg-emerald-50 rounded-full md:rounded-2xl transition-all active:scale-95 border border-gray-200 hover:border-emerald-200 shadow-sm"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 md:-top-1.5 md:-left-1.5 bg-red-500 text-white text-[9px] md:text-[10px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
