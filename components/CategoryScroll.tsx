
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'الالواح الشمسيه',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286799/Gemini_Generated_Image_cheyszcheyszchey_smkwp4.png',
    url: '#/category/solar-panels'
  },
  {
    name: 'البطاريات',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286800/Gemini_Generated_Image_rqnnitrqnnitrqnn_alp0zw.png',
    url: '#/category/batteries'
  },
  {
    name: 'الانفرترات',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286796/Gemini_Generated_Image_gyiz8kgyiz8kgyiz_b9dfzx.png',
    url: '#/category/off-grid-inverters'
  },
  {
    name: 'الاجهزة المنزلية',
    image: 'https://i.postimg.cc/L63YjJSs/IMG-20260125-WA0048.jpg',
    url: '#/category/home-appliances'
  },
  {
    name: 'المكيفات',
    image: 'https://i.postimg.cc/nhsXg07z/IMG_20260125_WA0054.jpg',
    url: '#/category/air-conditioners'
  },
  {
    name: 'اجهزة الطباخه',
    image: 'https://i.postimg.cc/13L8Qwcg/IMG-20260125-WA0070.jpg',
    url: '#/category/cookers'
  },
  {
    name: 'منظومات جاهزه للمنازل',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286800/Gemini_Generated_Image_ayzoi1ayzoi1ayzo_gxhlex.png',
    url: '#/category/home-systems'
  },
  {
    name: 'الغطاسات',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286799/Gemini_Generated_Image_tqzkmatqzkmatqzk_aq73iw.png',
    url: '#/category/submersible-stations'
  },
  {
    name: 'قواعد الالواح الشمسيه',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286793/81bcf5a9-5f9c-4621-bafe-86af17908392_yao4cu.jpg',
    url: '#/category/panel-mounts'
  },
  {
    name: 'قواطع وحمايات',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286794/a2967090-36fc-4846-9284-39d54166cc7f_qa9ipt.jpg',
    url: '#/category/breakers-protections'
  },
  {
    name: 'كيابل الالواح الشمسيه',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286793/e81e271c-820e-4b07-84cf-e8bbba9066f3_x7jyou.jpg',
    url: '#/category/solar-cables'
  },
  {
    name: 'كشافات الطاقة الشمسية',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286792/af9a6974-8a25-442c-bb9f-a7d71ce12fe3_ojklsg.jpg',
    url: '#/category/solar-lights'
  }
];

const CategoryScroll: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = () => {
    setIsHovered(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 10000);
  };

  useEffect(() => {
    if (isHovered) return;

    const intervalId = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 200; // rough width of an item
        
        if (Math.abs(container.scrollLeft) + container.clientWidth >= container.scrollWidth - 10) {
             container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
             container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <section className="py-6 md:py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 border-r-4 border-primary pr-3 md:pr-4">تسوق حسب القسم</h2>
      </div>
      
      <div 
        ref={scrollContainerRef}
        onTouchStart={handleInteraction}
        onMouseEnter={handleInteraction}
        className="flex overflow-x-auto gap-3 md:gap-4 px-4 pb-4 md:pb-6 scrollbar-hide snap-x snap-mandatory" 
        style={{ direction: 'rtl' }}
      >
        {categories.map((cat, idx) => (
          <motion.a
            key={idx}
            href={cat.url}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="snap-center shrink-0 w-20 md:w-56 group"
          >
            <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden shadow-sm md:shadow-md mb-2 md:mb-3">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>
            <h3 className="text-center font-bold text-slate-800 group-hover:text-primary transition-colors text-[10px] md:text-base leading-tight">
              {cat.name}
            </h3>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default CategoryScroll;
