
import React, { useState } from 'react';

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const WHATSAPP_NUMBER = '967784400333';
  const PHONE_NUMBER = '+967784400222';
  const FACEBOOK_URL = 'https://facebook.com/hyfan.energy';
  const INSTAGRAM_URL = 'https://instagram.com/hyfan.energy';
  const MAP_URL = 'https://maps.google.com/?q=Hayfan+Renewable+Energy';

  const icons = [
    { id: 'whatsapp', icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.7 8.38 8.38 0 0 1 3.8.9L21 3z', color: 'bg-[#25D366]', url: `https://wa.me/${WHATSAPP_NUMBER}`, title: 'واتساب' },
    { id: 'phone', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', color: 'bg-[#007AFF]', url: `tel:${PHONE_NUMBER}`, title: 'اتصال' },
    { id: 'facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', color: 'bg-[#1877F2]', url: FACEBOOK_URL, title: 'فيسبوك' },
    { id: 'instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', url: INSTAGRAM_URL, title: 'إنستجرام' },
    { id: 'maps', icon: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 10 a3 3 0 1 0 0 -6 a3 3 0 1 0 0 6', color: 'bg-[#EA4335]', url: MAP_URL, title: 'موقعنا' },
  ];

  return (
    <div className="fixed left-6 bottom-6 md:left-10 md:bottom-10 z-[60] flex flex-col items-center">
      {/* Sub Buttons Wrapper */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {icons.map((item, idx) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative ${item.color} w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40`}
            style={{ 
              transitionDelay: isOpen ? `${idx * 50}ms` : '0ms',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <path d={item.icon} />
            </svg>
            
            {/* Tooltip Label */}
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900/80 backdrop-blur-md text-white text-[10px] md:text-xs font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
              {item.title}
            </span>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-18 md:h-18 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 active:scale-90 border-4 border-white z-20 ${isOpen ? 'bg-gray-800 rotate-180' : 'bg-emerald-600 hover:bg-emerald-500 animate-pulse-gentle'}`}
        style={{ boxShadow: '0 15px 35px -5px rgba(16, 185, 129, 0.4)' }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <div className="relative">
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        )}
      </button>
      
      <style>{`
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); box-shadow: 0 15px 35px -5px rgba(16, 185, 129, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 20px 45px -5px rgba(16, 185, 129, 0.6); }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FloatingContact;
