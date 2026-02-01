
import React from 'react';

const BrandSection: React.FC = () => {
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">وكيل معتمد وموزع رسمي لكبرى الشركات العالمية في اليمن</p>
        <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:opacity-100 transition-all">
           <div className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center overflow-hidden border border-gray-100 rounded-2xl hover:border-emerald-200 hover:shadow-lg transition-all">
             <img src={LOGO_URL} alt="حيفان للطاقة" className="h-full w-full object-cover" />
           </div>
           <div className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center overflow-hidden border border-gray-100 rounded-2xl hover:border-emerald-200 hover:shadow-lg transition-all">
             <img src={LOGO_URL} alt="حيفان للطاقة" className="h-full w-full object-cover" />
           </div>
           <div className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center overflow-hidden border border-gray-100 rounded-2xl hover:border-emerald-200 hover:shadow-lg transition-all">
             <img src={LOGO_URL} alt="حيفان للطاقة" className="h-full w-full object-cover" />
           </div>
           <div className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center overflow-hidden border border-gray-100 rounded-2xl hover:border-emerald-200 hover:shadow-lg transition-all">
             <img src={LOGO_URL} alt="حيفان للطاقة" className="h-full w-full object-cover" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
