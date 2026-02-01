
import React from 'react';

const FloatingContact: React.FC = () => {
  const WHATSAPP_NUMBER = '967784400333';
  const PHONE_NUMBER = '+967784400222';
  const FACEBOOK_URL = 'https://facebook.com/hyfan.energy';
  const INSTAGRAM_URL = 'https://instagram.com/hyfan.energy';
  const MAP_URL = 'https://maps.google.com/?q=Hayfan+Renewable+Energy';

  const icons = [
    { id: 'whatsapp', icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.7 8.38 8.38 0 0 1 3.8.9L21 3z', color: 'bg-[#25D366]', url: `https://wa.me/${WHATSAPP_NUMBER}`, title: 'واتساب' },
    { id: 'phone', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', color: 'bg-[#007AFF]', url: `tel:${PHONE_NUMBER}`, title: 'اتصال هاتفي' },
    { id: 'facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', color: 'bg-[#1877F2]', url: FACEBOOK_URL, title: 'فيسبوك' },
    { id: 'instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', url: INSTAGRAM_URL, title: 'إنستجرام' },
    { id: 'maps', icon: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 10 a3 3 0 1 0 0 -6 a3 3 0 1 0 0 6', color: 'bg-[#EA4335]', url: MAP_URL, title: 'موقعنا على الخريطة' },
  ];

  return (
    <div className="fixed left-4 bottom-28 z-50 flex flex-col gap-4 group pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto items-center">
        {icons.map((item, idx) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item.color} w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:scale-125 hover:-translate-y-1 transition-all active:scale-95 border-2 border-white/50 animate-bounce-slow`}
            style={{ animationDelay: `${idx * 0.2}s` }}
            title={item.title}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
          </a>
        ))}
      </div>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FloatingContact;
