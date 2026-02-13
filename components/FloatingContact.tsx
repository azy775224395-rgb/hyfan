
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Facebook, Instagram, Share2, X } from 'lucide-react';

interface FloatingContactProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FloatingContact: React.FC<FloatingContactProps> = ({ isOpen, onToggle }) => {
  const CONTACT_LINKS = [
    {
      id: 'whatsapp',
      icon: <MessageCircle size={24} />,
      label: 'واتساب',
      color: 'bg-[#25D366]',
      href: 'https://wa.me/967784400333'
    },
    {
      id: 'facebook',
      icon: <Facebook size={24} />,
      label: 'فيسبوك',
      color: 'bg-[#1877F2]',
      href: 'https://www.facebook.com/profile.php?id=61577192150477'
    },
    {
      id: 'instagram',
      icon: <Instagram size={24} />,
      label: 'إنستجرام',
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      href: 'https://www.instagram.com/moose.3433085?igsh=MnZ0bGN2NWJ2OHBx'
    },
    {
      id: 'phone',
      icon: <Phone size={24} />,
      label: 'اتصال',
      color: 'bg-[#061e23]',
      href: 'tel:+967784400333'
    }
  ];

  return (
    <div className="fixed right-6 bottom-24 md:bottom-12 z-[60] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-3 items-end mb-2 pointer-events-auto">
            {CONTACT_LINKS.map((link, idx) => (
              <motion.a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.5 }}
                transition={{ delay: idx * 0.05, type: 'spring' }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-white text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                  {link.label}
                </span>
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform ${link.color}`}
                >
                  {link.icon}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.9 }}
        className={`pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 ${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-emerald-600 hover:bg-emerald-500 animate-pulse-slow'
        }`}
      >
        {isOpen ? <X size={28} /> : <Share2 size={28} />}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
