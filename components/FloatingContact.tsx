
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Facebook, Instagram, Headset, X, MapPin } from 'lucide-react';

interface FloatingContactProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FloatingContact: React.FC<FloatingContactProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="fixed right-6 bottom-24 md:bottom-12 z-[60] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-3 items-end mb-2 pointer-events-auto">
            <motion.button
              onClick={() => {
                const a = document.createElement('a');
                // You can replace this with an actual Google Maps link if known
                a.href = 'https://maps.google.com/?q=صنعاء+شارع+تعز'; 
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              initial={{ opacity: 0, x: 20, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.5 }}
              className="flex items-center gap-3 group"
            >
              <span className="bg-white text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                موقعنا على الخريطة
              </span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-emerald-900 shadow-lg bg-yellow-400 hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
            </motion.button>
            <motion.button
              onClick={() => {
                const a = document.createElement('a');
                a.href = 'https://www.facebook.com/profile.php?id=61577192150477';
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              initial={{ opacity: 0, x: 20, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.5 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg bg-[#1877F2] hover:scale-110 transition-transform">
                <Facebook size={24} />
              </div>
            </motion.button>
            <motion.button
              onClick={() => {
                const a = document.createElement('a');
                a.href = 'https://www.instagram.com/moose.3433085?igsh=MnZ0bGN2NWJ2OHBx';
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              initial={{ opacity: 0, x: 20, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.5 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg focus:outline-none bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:scale-110 transition-transform">
                <Instagram size={24} />
              </div>
            </motion.button>
            <motion.button
              onClick={() => {
                 const a = document.createElement('a');
                 a.href = 'https://wa.me/967784400333';
                 a.target = '_blank';
                 a.rel = 'noopener noreferrer';
                 document.body.appendChild(a);
                 a.click();
                 document.body.removeChild(a);
              }}
              initial={{ opacity: 0, x: 20, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.5 }}
              className="flex items-center gap-3 group"
            >
              <span className="bg-white text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                واتساب
              </span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg bg-[#25D366] hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
            </motion.button>
            <motion.button
              onClick={() => {
                 window.location.href = 'tel:+967784400333';
              }}
              initial={{ opacity: 0, x: 20, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.5 }}
              className="flex items-center gap-3 group"
            >
              <span className="bg-white text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                اتصال هاتفي
              </span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg bg-[#061e23] hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 pointer-events-auto">
        <motion.button
          onClick={onToggle}
          whileTap={{ scale: 0.9 }}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 ${
            isOpen ? 'bg-gray-800 rotate-90' : 'bg-emerald-600 hover:bg-emerald-500 animate-pulse-slow'
          }`}
        >
          {isOpen ? <X size={28} /> : <Headset size={28} />}
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingContact;
