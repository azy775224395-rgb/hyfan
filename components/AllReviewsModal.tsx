
import React from 'react';
import { Review } from '../types';

interface AllReviewsModalProps {
  reviews: Review[];
  onClose: () => void;
}

const AllReviewsModal: React.FC<AllReviewsModalProps> = ({ reviews, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-3xl overflow-hidden animate-fade-in flex flex-col h-[85vh]">
        <div className="p-8 md:p-14 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-emerald-950 mb-2">تجارب حقيقية</h2>
            <p className="text-emerald-600 font-bold text-sm md:text-lg">ماذا يقول أكثر من 40 ألف عميل واثق؟</p>
          </div>
          <button onClick={onClose} className="p-4 bg-gray-50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-6 scrollbar-hide">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
               <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-900 text-base md:text-lg">{review.name}</h4>
                    <span className="text-[10px] md:text-xs text-gray-400 font-bold">{review.date}</span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed font-bold italic">"{review.comment}"</p>
            </div>
          ))}
        </div>

        <div className="p-8 bg-emerald-50 text-center shrink-0">
          <p className="text-emerald-700 font-black">أكثر من 98% من عملائنا ينصحون بالتعامل معنا</p>
        </div>
      </div>
    </div>
  );
};

export default AllReviewsModal;
