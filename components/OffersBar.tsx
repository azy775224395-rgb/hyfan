
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Zap, Phone, Award, Wrench } from 'lucide-react';

const OffersBar: React.FC = () => {
  const offers = [
    { id: 1, text: "شحن سريع وآمن لجميع محافظات اليمن", icon: Truck },
    { id: 2, text: "ضمان استبدال فوري حقيقي على البطاريات", icon: ShieldCheck },
    { id: 3, text: "دعم فني وخدمة عملاء على مدار الساعة", icon: Phone },
    { id: 4, text: "أسعار منافسة وخصومات حصرية للكاش", icon: Zap },
    { id: 5, text: "وكيل معتمد لألواح Jinko و Longi", icon: Award },
    { id: 6, text: "صيانة مجانية للمنظومات الكبيرة", icon: Wrench },
  ];

  return (
    <div className="bg-emerald-600 text-white py-2.5 overflow-hidden relative z-20 border-b border-emerald-500 shadow-sm">
       <div className="flex whitespace-nowrap w-full overflow-hidden">
          <motion.div
             className="flex gap-12 items-center min-w-full"
             // Move from left to right (or right to left based on preference). 
             // Since it's RTL, moving positively on X axis makes it flow naturally.
             animate={{ x: [0, -1000] }} 
             transition={{ 
               repeat: Infinity, 
               duration: 25, 
               ease: "linear",
               repeatType: "loop" 
             }}
          >
             {/* Repeat the list multiple times to ensure continuous loop without gaps */}
             {[...offers, ...offers, ...offers, ...offers].map((offer, i) => (
                <div key={i} className="flex items-center gap-2 px-2 opacity-95 hover:opacity-100 transition-opacity">
                   <offer.icon size={16} className="text-yellow-300 fill-yellow-300/20" />
                   <span className="text-xs md:text-sm font-black tracking-wide">{offer.text}</span>
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 mx-4"></span>
                </div>
             ))}
          </motion.div>
       </div>
    </div>
  );
};

export default OffersBar;
