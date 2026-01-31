import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-emerald-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          {/* صورة الشعار الجديد */}
          <img 
            src="https://i.postimg.cc/LsH76LbS/IMG-20260131-220137.png" 
            alt="شعار حيفان" 
            className="w-12 h-12 object-contain"
          />
          <span className="text-xl font-bold bg-gradient-to-l from-emerald-700 to-teal-500 bg-clip-text text-transparent hidden sm:block">
            حيفان للطاقة
          </span>
        </div>

        {/* Search */}
        <div className="flex-grow max-w-md relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن ألواح، بطاريات، مكيفات..."
            className="w-full bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-full px-10 py-2 transition-all outline-none text-sm"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>

        {/* Cart Action */}
        <button 
          onClick={onOpenCart}
          className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -left-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
