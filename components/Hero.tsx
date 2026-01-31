
import React from 'react';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative rounded-3xl overflow-hidden mb-12 bg-[#0d2a33] h-[350px] md:h-[450px] flex items-center shadow-2xl border border-white/10">
      <img 
        src="https://files.oaiusercontent.com/file-KAtX7wX86L26T6mNreF2sF?se=2025-02-17T21%3A08%3A42Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D73983279-b132-4740-9b4f-838615e4f481.webp&sig=G06X3x9WvY0eH95%2B6DozRclS1iW2vjW1O37M7L/6H9o%3D" 
        alt="حيفان للطاقة المتجددة" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
      
      <div className="relative container mx-auto px-8 z-10 max-w-2xl text-right">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          حيفان للطاقة <br />
          <span className="text-[#39f7df]">مستقبلٌ أخضر</span> ومستدام
        </h1>
        <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-md drop-shadow">
          نقدم لكم أحدث تقنيات الطاقة الشمسية والحلول المتكاملة لتشغيل منزلك بأمان وكفاءة عالية.
        </p>
        <div className="flex gap-4 justify-end">
          <button 
            onClick={scrollToProducts}
            className="bg-[#10b981] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-900/40 hover:bg-emerald-600 transition-all active:scale-95"
          >
            عرض المنتجات
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all">
            عن المتجر
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
