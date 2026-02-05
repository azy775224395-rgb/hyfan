
import React, { useState, useEffect } from 'react';
import { Review, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';
import { ReviewService } from '../services/reviewService';

interface ReviewSectionProps {
  onShowAll: (reviews: Review[]) => void;
  user: UserProfile | null;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ onShowAll, user }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const cloudReviews = await ReviewService.fetchReviews();
        setReviews(cloudReviews || []);
      } catch (err) {
        console.error("Reviews load error", err);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // استخدام اسم المستخدم المسجل أو اسم افتراضي إذا لم يسجل
    const displayName = user ? user.name : 'عميل حيفان';

    if (rating === 0 || !comment.trim()) {
      alert('يرجى اختيار التقييم وكتابة تعليقك');
      return;
    }
    
    setIsSubmitting(true);
    
    const newReview: Review = {
      id: Date.now(),
      name: displayName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    try {
      const success = await ReviewService.addReview(newReview);
      if (success) {
        setReviews(prev => [newReview, ...prev]);
        NotificationService.sendTelegramNotification(NotificationService.formatReviewMessage(newReview));
        setSubmitted(true);
        setComment('');
        setRating(0);
      } else {
        throw new Error("Add review failed");
      }
    } catch (err) {
      alert('تم حفظ التقييم محلياً بسبب ضعف الاتصال، سيظهر للجميع قريباً.');
      setReviews(prev => [newReview, ...prev]);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border border-emerald-50 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
        {/* Review Form */}
        <div className="bg-emerald-900 rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">قيم تجربتك</h2>
            <p className="text-emerald-100/70 font-bold mb-10 leading-relaxed">أخبرنا عن رأيك في منتجات حيفان لتظهر لكل زوار الموقع</p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* معلومات المستخدم التلقائية */}
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 mb-2">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center border-2 border-white/20 overflow-hidden shadow-lg">
                    {user ? <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} /> : <span className="font-black">👤</span>}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">النشر باسم:</p>
                    <p className="font-black text-lg">{user ? user.name : 'عميل زائر'}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-125"
                    >
                      <svg 
                        className="w-8 h-8 md:w-12 md:h-12"
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

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="كيف كانت تجربتك مع منتجاتنا وخدماتنا؟"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 outline-none focus:ring-4 focus:ring-emerald-400/20 transition-all min-h-[120px] font-bold"
                />

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-emerald-900 py-5 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-xl active:scale-95 text-lg flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-emerald-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري الحفظ...
                    </>
                  ) : 'نشر التقييم عالمياً'}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-3xl font-black mb-2">شكراً لثقتك!</h3>
                <p className="text-emerald-100/70 text-lg">تم حفظ تقييمك بنجاح وسيظهر للجميع الآن.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-white underline font-bold">إضافة تقييم آخر</button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-950">التقييمات الحية</h3>
            <button 
              onClick={() => onShowAll(reviews)}
              className="text-emerald-600 font-black text-sm md:text-base hover:underline flex items-center gap-2"
            >
              عرض الكل ({reviews.length})
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          <div className="space-y-6 relative min-h-[400px]">
            {isLoadingReviews ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50/50 p-6 rounded-[2rem] border border-emerald-50 animate-pulse">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="w-24 h-3 bg-gray-200 rounded"></div>
                        <div className="w-16 h-2 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded"></div>
                </div>
              ))
            ) : reviews.length > 0 ? (
              reviews.slice(0, 6).map((review) => (
                <div key={review.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-emerald-50 shadow-sm hover:shadow-md transition-all group animate-fade-in">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-black text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-emerald-900 text-base">{review.name}</h4>
                        <span className="text-[10px] text-gray-300 font-bold uppercase">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-bold italic">"{review.comment}"</p>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-400 font-bold">كن أول من يضيف تقييماً!</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
