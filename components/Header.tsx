
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, searchQuery, setSearchQuery, onLogoClick }) => {
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/40 backdrop-blur-2xl border-b border-emerald-100 shadow-xl shadow-emerald-900/5">
      <div className="container mx-auto px-4 h-16 md:h-24 flex items-center justify-between gap-3 md:gap-6">
        {/* Brand Section */}
        <div 
          className="relative flex items-center gap-2 md:gap-4 group cursor-pointer shrink-0"
          onClick={onLogoClick}
        >
          <div className="absolute -inset-4 bg-emerald-500/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative w-9 h-9 md:w-14 md:h-14 bg-white rounded-lg md:rounded-2xl flex items-center justify-center overflow-hidden shadow-lg border border-emerald-50 group-hover:scale-105 transition-transform duration-500">
            <img src={LOGO_URL} alt="حيفان للطاقة" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm md:text-2xl font-black bg-gradient-to-l from-emerald-950 to-emerald-700 bg-clip-text text-transparent leading-none">
              حيفان للطاقة
            </span>
            <span className="text-[7px] md:text-[11px] font-black text-emerald-600/70 hidden sm:block tracking-widest mt-1 md:mt-2 uppercase">
              Energy Solutions 2026
            </span>
          </div>
        </div>

        {/* Improved Search Bar */}
        <div className="flex-grow max-w-xl relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث..."
            className="w-full bg-white/60 backdrop-blur-3xl border border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-300 rounded-full md:rounded-[1.5rem] px-10 py-2 md:px-14 md:py-4 transition-all outline-none text-[10px] md:text-base font-bold text-emerald-950 placeholder:text-emerald-300"
          />
          <svg className="absolute right-3.5 md:right-5 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" xmlns="http://www.w3.org/2000/svg" width="16" height="16" md:width="22" md:height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>

        {/* Cart Action */}
        <button 
          onClick={onOpenCart}
          className="relative p-2 md:p-4 text-emerald-800 hover:text-emerald-600 bg-white/60 hover:bg-white rounded-full md:rounded-[1.2rem] transition-all active:scale-90 border border-emerald-50 hover:border-emerald-200 shadow-lg shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" md:width="28" md:height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -left-1 md:-top-1.5 md:-left-1.5 bg-emerald-600 text-white text-[8px] md:text-[11px] font-black w-4 h-4 md:w-7 md:h-7 flex items-center justify-center rounded-full border border-white shadow-2xl animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
