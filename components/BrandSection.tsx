
import React from 'react';

const BrandSection: React.FC = () => {
  const brands = [
    { name: 'Jinko Solar', logo: 'https://i.postimg.cc/mD8zQ6Bq/Screenshot-2026-05-19-at-12-00-00.png' }, // Placeholder or generic
    { name: 'Longi', logo: 'https://i.postimg.cc/mD8zQ6Bq/Screenshot-2026-05-19-at-12-00-00.png' },
    { name: 'Growatt', logo: 'https://i.postimg.cc/mD8zQ6Bq/Screenshot-2026-05-19-at-12-00-00.png' },
    { name: 'TUBO', logo: 'https://i.postimg.cc/mD8zQ6Bq/Screenshot-2026-05-19-at-12-00-00.png' },
  ];

  return (
    <section className="py-6 md:py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-8">وكيل معتمد وموزع رسمي لكبرى الشركات العالمية في اليمن</p>
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-12 opacity-60">
           {brands.map((brand, i) => (
             <div key={i} className="px-3 md:px-6 py-2 md:py-4 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center font-black text-slate-300 text-sm md:text-xl tracking-tighter">
               {brand.name}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
