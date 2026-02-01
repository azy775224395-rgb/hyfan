
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-emerald-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Brand Section with Glowing Aura */}
        <div 
          className="relative flex items-center gap-3 group cursor-pointer"
          onClick={onLogoClick}
        >
          {/* Subtle Glow behind the logo area */}
          <div className="absolute -inset-2 bg-emerald-400/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_8px_20px_-4px_rgba(16,185,129,0.3)] border border-emerald-50 group-hover:scale-110 transition-transform duration-300">
            <img src={LOGO_URL} alt="حيفان للطاقة" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-l from-emerald-800 to-emerald-500 bg-clip-text text-transparent hidden sm:block leading-none">
              حيفان للطاقة
            </span>
            <span className="text-[10px] font-bold text-emerald-600/60 hidden sm:block tracking-widest mt-1">
              HYFAN ENERGY
            </span>
          </div>
        </div>

        {/* Improved Search Bar */}
        <div className="flex-grow max-w-lg relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن ألواح، بطاريات، مكيفات..."
            className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 rounded-2xl px-12 py-3 transition-all outline-none text-sm font-medium"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>

        {/* Cart Action with animation */}
        <button 
          onClick={onOpenCart}
          className="relative p-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-emerald-100 shadow-sm hover:shadow-emerald-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -left-1 bg-emerald-600 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
