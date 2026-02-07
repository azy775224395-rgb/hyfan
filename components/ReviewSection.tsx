
import React, { useState, useEffect, useRef } from 'react';
import { Review, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';
import { supabase } from '../lib/supabaseClient';
import { ReviewService } from '../services/reviewService';

interface ReviewSectionProps {
  onShowAll: (reviews: Review[]) => void;
  user: UserProfile | null;
  productId?: string; // Optional filtering by product
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ onShowAll, user, productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch Reviews with Filter
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

  // Initial Fetch & Real-time Subscription
  useEffect(() => {
    fetchReviews();

    const channel = supabase.channel('realtime_reviews')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'reviews',
          filter: productId ? `product_id=eq.${productId}` : undefined 
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("حجم الصورة يجب أن يكون أقل من 2 ميجابايت");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("يرجى تسجيل الدخول أولاً لإضافة تقييم");
      window.location.hash = '#/auth';
      return;
    }

    if (rating === 0 || !comment.trim()) {
      alert('يرجى اختيار التقييم وكتابة تعليقك');
      return;
    }
    
    setIsSubmitting(true);
    
    // Use the Service which now guarantees profile sync
    const newReview = await ReviewService.submitReview(
      user.id,
      productId || 'general',
      rating,
      comment,
      { name: user.name, avatar: user.avatar },
      imageFile || undefined
    );

    if (newReview) {
      NotificationService.sendTelegramNotification(NotificationService.formatReviewMessage(newReview));
      setSubmitted(true);
      setComment('');
      setRating(0);
      setImageFile(null);
      setPreviewUrl(null);
      
      // Explicit refresh to ensure sync
      fetchReviews();
    } else {
      // Error handled in service via alert
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="container mx-auto px-4 mb-8">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-5 md:p-12 border border-emerald-50 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Review Form */}
          <div className="bg-emerald-950 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 text-white relative overflow-hidden shadow-xl order-2 lg:order-1">
            <div className="relative z-10">
              <h2 className="text-xl md:text-3xl font-black mb-2">قيم تجربتك</h2>
              <p className="text-emerald-100/70 font-bold mb-6 text-xs md:text-base">رأيك يهمنا! شاركنا تجربتك.</p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center border-2 border-white/20 overflow-hidden shadow-lg shrink-0">
                      {user ? <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} /> : <span className="font-black text-sm">👤</span>}
                    </div>
                    <div className="text-right overflow-hidden">
                      <p className="text-[9px] text-emerald-400 font-black uppercase">النشر باسم:</p>
                      <p className="font-black text-sm truncate">{user ? user.name : 'زائر'}</p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="transition-transform active:scale-95"
                      >
                        <svg 
                          className="w-8 h-8"
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

                  {/* Comment Area */}
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="اكتب تعليقك هنا..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all min-h-[80px] text-sm font-bold"
                  />

                  {/* Image Upload */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border border-dashed border-white/20 rounded-xl p-2 text-center cursor-pointer transition-all hover:bg-white/5 flex items-center justify-center gap-2 ${previewUrl ? 'h-24' : 'h-16'}`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="h-full rounded-lg object-contain" />
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        <span className="text-[10px] font-bold text-emerald-100/60">صورة (اختياري)</span>
                      </>
                    )}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-emerald-900 py-3 rounded-xl font-black hover:bg-emerald-50 transition-all shadow-lg active:scale-95 text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? 'جاري النشر...' : 'نشر التقييم'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="text-xl font-black mb-1">شكراً لك!</h3>
                  <p className="text-emerald-100/70 text-sm">تم نشر تقييمك بنجاح.</p>
                  <button onClick={() => { setSubmitted(false); setPreviewUrl(null); }} className="mt-4 text-white text-xs underline font-bold">تقييم آخر</button>
                </div>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex flex-col gap-4 order-1 lg:order-2">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl md:text-2xl font-black text-emerald-950">آراء العملاء</h3>
              <button 
                onClick={() => onShowAll(reviews)}
                className="text-emerald-600 font-bold text-xs hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-emerald-50 shadow-sm"
              >
                عرض الكل
              </button>
            </div>
            
            <div className="space-y-3 relative">
              {isLoadingReviews ? (
                [...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white/40 h-24 rounded-2xl animate-pulse" />
                ))
              ) : reviews.length > 0 ? (
                reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center overflow-hidden border border-emerald-200 shrink-0">
                          {review.avatar_url ? (
                            <img src={review.avatar_url} alt={review.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-emerald-700 font-black text-xs">{review.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-black text-emerald-900 text-xs md:text-sm line-clamp-1">{review.name}</h4>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] text-gray-300 font-bold">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-bold">"{review.comment}"</p>
                    
                    {review.image_url && (
                      <div className="mt-2 rounded-lg overflow-hidden h-16 w-16 border border-gray-100">
                         <img src={review.image_url} alt="Review attachment" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 font-bold text-sm">كن أول من يضيف تقييماً!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
