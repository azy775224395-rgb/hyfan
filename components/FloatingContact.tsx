
import React from 'react';

interface FloatingContactProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FloatingContact: React.FC<FloatingContactProps> = ({ isOpen, onToggle }) => {
  const WHATSAPP_NUMBER = '967784400333';
  const PHONE_NUMBER = '+967784400222';
  // روابط محدثة لتعمل بشكل مباشر واحترافي
  const FACEBOOK_URL = 'https://www.facebook.com/hayfan.energy';
  const INSTAGRAM_URL = 'https://www.instagram.com/hayfan.energy';
  // رابط خرائط جوجل ذكي يبحث عن اسم المتجر في اليمن لضمان ظهور النتائج
  const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=حيفان+للطاقة+المتجددة+اليمن';

  const icons = [
    { id: 'whatsapp', icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.7 8.38 8.38 0 0 1 3.8.9L21 3z', color: 'bg-[#25D366]', url: `https://wa.me/${WHATSAPP_NUMBER}`, title: 'واتساب' },
    { id: 'phone', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', color: 'bg-[#007AFF]', url: `tel:${PHONE_NUMBER}`, title: 'اتصال' },
    { id: 'facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', color: 'bg-[#1877F2]', url: FACEBOOK_URL, title: 'فيسبوك' },
    { id: 'instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', url: INSTAGRAM_URL, title: 'إنستجرام' },
    { id: 'maps', icon: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 10 a3 3 0 1 0 0 -6 a3 3 0 1 0 0 6', color: 'bg-[#EA4335]', url: MAP_URL, title: 'موقعنا' },
  ];

  return (
    <div className="fixed left-5 bottom-5 md:left-10 md:bottom-10 z-[60] flex flex-col items-center">
      {/* Sub Buttons Wrapper */}
      <div className={`flex flex-col gap-2.5 mb-3 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        {icons.map((item, idx) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative ${item.color} w-9 h-9 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40`}
            style={{ 
              transitionDelay: isOpen ? `${idx * 40}ms` : '0ms'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <path d={item.icon} />
            </svg>
            <span className="absolute right-full mr-3 bg-emerald-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
              {item.title}
            </span>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={onToggle}
        className={`w-12 h-12 md:w-18 md:h-18 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 active:scale-90 border-[3px] border-white z-20 ${isOpen ? 'bg-gray-800 rotate-180' : 'bg-emerald-600 hover:bg-emerald-500'}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <div className="relative">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
             <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingContact;
