
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
    <header className="sticky top-0 z-40 w-full bg-white/40 backdrop-blur-2xl border-b border-emerald-100 shadow-xl shadow-emerald-900/5">
      <div className="container mx-auto px-3 h-14 md:h-24 flex items-center justify-between gap-2 md:gap-6">
        {/* Logo Section */}
        <div 
          className="relative flex items-center gap-1.5 md:gap-4 group cursor-pointer shrink-0"
          onClick={onLogoClick}
        >
          <div className="relative w-8 h-8 md:w-14 md:h-14 bg-white rounded-lg md:rounded-2xl flex items-center justify-center overflow-hidden shadow-lg border border-emerald-50 group-hover:scale-105 transition-transform duration-500">
            <img src={LOGO_URL} alt="حيفان للطاقة" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-[13px] md:text-2xl font-black bg-gradient-to-l from-emerald-950 to-emerald-700 bg-clip-text text-transparent leading-none">
              حيفان للطاقة
            </span>
            <div className="flex items-center gap-2 mt-1 md:mt-2">
              <span className="text-[6px] md:text-[11px] font-black text-emerald-600/70 hidden sm:block tracking-widest uppercase">
                Energy Solutions 2026
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
              placeholder="ابحث عن ألواح، بطاريات..."
              className="w-full bg-white/60 backdrop-blur-3xl border border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-300 rounded-full md:rounded-[1.5rem] px-8 py-1.5 md:px-14 md:py-4 transition-all outline-none text-[9px] md:text-base font-bold text-emerald-950 placeholder:text-emerald-300"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300 hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
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
              <span>الإدارة</span>
            </button>
          )}

          <button 
            onClick={onOpenAuth}
            className="p-1.5 md:p-4 text-emerald-800 hover:text-emerald-600 bg-white/60 hover:bg-white rounded-full md:rounded-[1.2rem] transition-all border border-emerald-50 hover:border-emerald-200 shadow-lg relative"
          >
            {user ? (
              <img src={user.avatar} className="w-4 h-4 md:w-7 md:h-7 rounded-full object-cover" alt="Profile" />
            ) : (
              <svg className="w-[16px] h-[16px] md:w-[28px] md:h-[28px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            )}
          </button>

          <button 
            onClick={onOpenCart}
            className="relative p-1.5 md:p-4 text-emerald-800 hover:text-emerald-600 bg-white/60 hover:bg-white rounded-full md:rounded-[1.2rem] transition-all active:scale-90 border border-emerald-50 hover:border-emerald-200 shadow-lg"
          >
            <svg className="w-[16px] h-[16px] md:w-[28px] md:h-[28px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 md:-top-1.5 md:-left-1.5 bg-emerald-600 text-white text-[7px] md:text-[11px] font-black w-3.5 h-3.5 md:w-7 md:h-7 flex items-center justify-center rounded-full border border-white shadow-2xl">
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
