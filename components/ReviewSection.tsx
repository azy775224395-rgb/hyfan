import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Review, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';
import { ReviewService } from '../services/reviewService';
import { Camera, CheckCircle, X, ZoomIn } from 'lucide-react';

interface ReviewSectionProps {
  onShowAll: (reviews: Review[]) => void;
  user: UserProfile | null;
  productId?: string;
}

type SortOption = 'newest' | 'highest' | 'with_images';

const ReviewSection: React.FC<ReviewSectionProps> = ({ onShowAll, user, productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [imagesBase64, setImagesBase64] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    let data = [];
    if (productId) {
      data = await ReviewService.fetchProductReviews(productId);
    } else {
      data = await ReviewService.fetchReviews();
    }
    setReviews(data);
    setIsLoadingReviews(false);
  };

  useEffect(() => {
    fetchReviews();
    const handleUpdate = () => fetchReviews();
    window.addEventListener('reviews-updated', handleUpdate);
    return () => {
      window.removeEventListener('reviews-updated', handleUpdate);
    };
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (imagesBase64.length + files.length > 3) {
        alert("يمكنك رفع 3 صور كحد أقصى");
        return;
      }
      
      files.forEach(file => {
        if (file.size > 2 * 1024 * 1024) {
          alert("حجم الصورة يجب أن يكون أقل من 2 ميجابايت");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagesBase64(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagesBase64(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("يرجى تسجيل الدخول أولاً لإضافة تقييم");
      window.location.hash = '/auth';
      return;
    }

    if (rating === 0 || !comment.trim()) {
      alert('يرجى اختيار التقييم وكتابة تعليقك');
      return;
    }
    
    setIsSubmitting(true);
    
    const newReview = await ReviewService.submitReview(
      user.id,
      productId || 'general',
      rating,
      comment,
      { name: user.name, avatar: user.avatar },
      imagesBase64
    );

    if (newReview) {
      setSubmitted(true);
      setComment('');
      setRating(0);
      setImagesBase64([]);
      fetchReviews();
    }
    
    setIsSubmitting(false);
  };

  const sortedReviews = useMemo(() => {
    let sorted = [...reviews];
    if (sortOption === 'highest') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'with_images') {
      sorted = sorted.filter(r => r.images && r.images.length > 0)
        .sort((a, b) => b.created_at - a.created_at);
    } else {
      sorted.sort((a, b) => b.created_at - a.created_at);
    }
    return sorted;
  }, [reviews, sortOption]);

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) {
        counts[r.rating as keyof typeof counts]++;
      }
    });
    return counts;
  }, [reviews]);

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) 
    : '0.0';

  return (
    <section className="container mx-auto px-4 mb-8">
      {zoomedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setZoomedImage(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-emerald-400 bg-white/10 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
          <img src={zoomedImage} alt="Zoomed" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <div className="w-full bg-white/60 backdrop-blur-xl rounded-[2rem] p-5 md:p-8 border border-emerald-50 shadow-lg">
        
        {/* Rating Summary Bar */}
        <div className="bg-white rounded-[1.5rem] p-6 mb-8 border border-emerald-50 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-gray-100 pb-6 md:pb-0 md:pl-8 text-center shrink-0 w-full md:w-auto">
            <h3 className="text-5xl font-black text-emerald-950">{averageRating}</h3>
            <div className="flex gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.round(Number(averageRating)) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ))}
            </div>
            <p className="text-gray-500 font-bold text-sm">بناءً على {totalReviews} تقييم</p>
          </div>
          
          <div className="flex-1 w-full flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCounts[star as keyof typeof ratingCounts];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-gray-600 font-bold text-sm w-12 flex items-center justify-end gap-1">{star} <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-gray-400 font-bold text-xs w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          
          {/* Review Form */}
          <div className="w-full bg-emerald-950 rounded-[1.5rem] p-6 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                
                <div className="w-full lg:w-1/4 flex flex-col gap-2 border-b lg:border-b-0 lg:border-l border-white/10 pb-4 lg:pb-0 lg:pl-6 text-center lg:text-right">
                    <h2 className="text-xl font-black mb-1">قيم تجربتك</h2>
                    <p className="text-emerald-100/70 font-bold text-xs">رأيك يهمنا! شاركنا تجربتك وصور المنتج.</p>
                </div>

                <div className="w-full lg:w-3/4">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                         
                         <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                           <div className="flex items-center justify-center bg-white/5 rounded-xl px-3 py-2 border border-white/10 shrink-0">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  disabled={isSubmitting}
                                  onClick={() => setRating(star)}
                                  onMouseEnter={() => setHover(star)}
                                  onMouseLeave={() => setHover(0)}
                                  className="transition-transform active:scale-95 px-0.5"
                                >
                                  <svg 
                                    className="w-8 h-8 md:w-6 md:h-6"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill={(hover || rating) >= star ? "#fbbf24" : "transparent"} 
                                    stroke={(hover || rating) >= star ? "#fbbf24" : "rgba(255,255,255,0.3)"} 
                                    strokeWidth="1.5"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                  </svg>
                                </button>
                              ))}
                           </div>
                           
                           <input
                              type="text"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="اكتب تعليقك هنا..."
                              className="w-full flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm font-bold h-12"
                            />

                           <button 
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full md:w-auto px-6 bg-white text-emerald-900 h-12 rounded-xl font-black hover:bg-emerald-50 transition-all shadow-lg active:scale-95 text-sm flex items-center justify-center gap-2 disabled:opacity-70 whitespace-nowrap shrink-0"
                            >
                              {isSubmitting ? 'جاري...' : 'نشر'}
                            </button>
                         </div>

                         {/* Image Upload Area */}
                         <div className="flex items-center gap-4 flex-wrap mt-2">
                           {imagesBase64.length < 3 && (
                             <label className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 border-dashed rounded-xl h-16 w-16 flex flex-col items-center justify-center text-white/70 transition-colors">
                               <Camera size={20} />
                               <span className="text-[10px] mt-1 font-bold">إرفاق صورة</span>
                               <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
                             </label>
                           )}
                           
                           {imagesBase64.map((img, idx) => (
                             <div key={idx} className="relative h-16 w-16 rounded-xl overflow-hidden border border-white/20 group">
                               <img src={img} alt="upload preview" className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <button type="button" onClick={() => removeImage(idx)} className="text-white hover:text-red-400 focus:outline-none">
                                   <X size={18} />
                                 </button>
                               </div>
                             </div>
                           ))}
                         </div>
                    </form>
                  ) : (
                    <div className="h-full flex flex-col justify-center items-center gap-3 animate-fade-in text-center py-4">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle size={28} />
                        <h3 className="text-lg font-black text-white">تم إضافة التقييم بنجاح!</h3>
                      </div>
                      <button onClick={() => setSubmitted(false)} className="text-white/50 hover:text-white text-xs underline font-bold mt-2">تقييم آخر</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
              <h3 className="text-xl md:text-2xl font-black text-emerald-950">آراء العملاء</h3>
              
              <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-transparent text-sm font-bold text-gray-700 outline-none pr-2 pl-4 py-1"
                >
                  <option value="newest">الأحدث</option>
                  <option value="highest">الأعلى تقييماً</option>
                  <option value="with_images">مرفقة بصور</option>
                </select>
                <button 
                  onClick={() => onShowAll(reviews)}
                  className="text-emerald-700 font-bold text-xs bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  عرض الكل
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
              {isLoadingReviews ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white/40 h-40 rounded-2xl animate-pulse" />
                ))
              ) : sortedReviews.length > 0 ? (
                sortedReviews.slice(0, 6).map((review) => (
                  <div key={review.id} className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center overflow-hidden border border-emerald-200 shrink-0">
                          {review.avatar_url ? (
                            <img src={review.avatar_url} alt={review.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-emerald-700 font-black text-sm">{review.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 text-sm flex items-center gap-1.5 flex-wrap">
                            {review.name}
                            {review.isVerifiedPurchase && (
                              <span className="flex items-center gap-0.5 text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                <CheckCircle size={10} /> مشتري مؤكد
                              </span>
                            )}
                          </h4>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold shrink-0">{review.date}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed font-bold mb-3 flex-1">"{review.comment}"</p>
                    
                    {/* Mini Gallery */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-auto pt-3 border-t border-gray-50">
                        {review.images.map((img, idx) => (
                          <div key={idx} className="relative h-14 w-14 rounded-lg overflow-hidden border border-gray-100 cursor-pointer group" onClick={() => setZoomedImage(img)}>
                            <img src={img} alt="Review attachment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <ZoomIn size={14} className="text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  </div>
                  <h4 className="text-gray-900 font-black mb-1">لا توجد تقييمات بعد</h4>
                  <p className="text-gray-500 font-bold text-sm">كن أول من يضيف تقييماً لهذا المنتج!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
