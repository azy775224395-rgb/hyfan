
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const contentSequence = [
  {
    title: "أبو إيفان للطاقة المتجددة",
    subtitle: "نوفر أحدث حلول الطاقة الشمسية والأنظمة الذكية بجودة عالية تمنحك أداءً مستقراً وتوفيراً يدوم لسنوات"
  },
  {
    title: "حلول متكاملة للطاقة المتجددة",
    subtitle: "ألواح شمسية، بطاريات، إنفرترات وإكسسوارات أصلية مصممة لتمنحك أعلى كفاءة وأفضل استقرار للطاقة في منزلك أو مشروعك"
  },
  {
    title: "الريادة في حلول الطاقة المتجددة",
    subtitle: "نقدم تقنيات حديثة ومنتجات موثوقة لتشغيل المنازل والمنشآت بأعلى مستويات الجودة والكفاءة"
  }
];

const VideoPromo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contentSequence.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full aspect-video relative overflow-hidden group">
      <video 
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source 
          src="https://res.cloudinary.com/dxzqizvzw/video/upload/v1779204762/lv_0_%D9%A2%D9%A0%D9%A2%D9%A6%D9%A0%D9%A5%D9%A1%D9%A9%D9%A1%D9%A8%D9%A3%D9%A1%D9%A2%D9%A1_ydzz8l.mp4" 
          type="video/mp4" 
        />
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
      
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] mb-3 md:mb-6 leading-tight">
              {contentSequence[currentIndex].title}
            </h2>
            <p className="text-white/95 text-[11px] md:text-2xl font-bold max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] leading-relaxed">
              {contentSequence[currentIndex].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VideoPromo;
