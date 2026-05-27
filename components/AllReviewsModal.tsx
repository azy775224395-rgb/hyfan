
import React, { useEffect, useState } from 'react';
import { Review } from '../types';
import { ReviewService } from '../services/reviewService';
import { CheckCircle, X, ZoomIn } from 'lucide-react';

interface AllReviewsModalProps {
  onClose: () => void;
  reviews?: Review[]; // تم تغييره ليكون اختيارياً لكي يجلب البيانات محلياً إذا لزم الأمر
}

const AllReviewsModal: React.FC<AllReviewsModalProps> = ({ onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const data = await ReviewService.fetchReviews();
      setReviews(data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      {zoomedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setZoomedImage(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-emerald-400 bg-white/10 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
          <img src={zoomedImage} alt="Zoomed" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-emerald-950 mb-4">تجارب حقيقية</h2>
          <p className="text-emerald-600 font-bold text-lg md:text-xl">ماذا يقول أكثر من 40 ألف عميل واثق في اليمن؟</p>
        </div>
        <button onClick={onClose} className="p-5 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all font-black flex items-center gap-3 shadow-sm active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
          العودة للمتجر
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white h-48 rounded-[2.5rem] border border-emerald-50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-emerald-50 shadow-sm hover:shadow-xl transition-all flex flex-col group h-full">
               <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-950 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:rotate-6 transition-transform">
                    {review.avatar_url ? <img src={review.avatar_url} className="w-full h-full object-cover rounded-2xl" /> : review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-900 text-lg flex items-center gap-2 flex-wrap">
                      {review.name}
                      {review.isVerifiedPurchase && (
                        <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full whitespace-nowrap">
                          <CheckCircle size={12} /> مشتري مؤكد
                        </span>
                      )}
                    </h4>
                    <span className="text-xs text-gray-400 font-bold">{review.date}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
              </div>
              <p className="text-emerald-950/70 text-base md:text-lg leading-relaxed font-bold italic flex-1">"{review.comment}"</p>
              
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {review.images.map((img, idx) => (
                    <div key={idx} className="relative h-16 w-16 rounded-xl overflow-hidden border border-gray-100 cursor-pointer group/img" onClick={() => setZoomedImage(img)}>
                      <img src={img} alt="review image" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                        <ZoomIn size={16} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-emerald-50 flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                 <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                 تقييم موثق عبر الموقع
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 bg-emerald-950 p-12 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10">كن جزءاً من عائلة أبو إيفان</h3>
        <p className="text-emerald-400 font-bold text-lg md:text-xl mb-12 opacity-80 relative z-10">انضم لأكثر من 40,000 عميل سعيد في جميع أنحاء اليمن</p>
        <button onClick={onClose} className="bg-white text-emerald-950 px-16 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:bg-emerald-50 transition-all active:scale-95 relative z-10">تصفح المنتجات الآن</button>
      </div>
    </div>
  );
};

export default AllReviewsModal;
