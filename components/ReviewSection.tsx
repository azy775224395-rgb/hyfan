
import React, { useState } from 'react';

const ReviewSection: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('يرجى اختيار عدد النجوم لتقييم تجربتك');
      return;
    }
    
    setIsSubmitting(true);

    // محاكاة إرسال البيانات داخلياً بنجاح
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Review Captured Internally:', { rating, comment });
    }, 1800);
  };

  return (
    <section className="bg-emerald-900 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-[60px] animate-pulse"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-400/20 rounded-full blur-[60px] animate-pulse"></div>

      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="mb-10">
          <h2 className="text-4xl font-black mb-4">قيّم تجربتك</h2>
          <p className="text-emerald-100/70 font-bold leading-relaxed">رأيك يساعدنا على التطوير والارتقاء بمستوى الخدمة في حيفان للطاقة</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center gap-4 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className={`transition-all duration-300 transform ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125'}`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="44" 
                    height="44" 
                    viewBox="0 0 24 24" 
                    fill={(hover || rating) >= star ? "#fbbf24" : "transparent"} 
                    stroke={(hover || rating) >= star ? "#fbbf24" : "rgba(255,255,255,0.3)"} 
                    strokeWidth="1.5"
                    className="transition-colors drop-shadow-lg"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                value={comment}
                disabled={isSubmitting}
                onChange={(e) => setComment(e.target.value)}
                placeholder="اترك لنا تعليقاً حول جودة المنتجات أو الخدمة..."
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white placeholder:text-white/20 outline-none focus:ring-4 focus:ring-emerald-400/20 transition-all min-h-[140px] text-sm font-medium resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-emerald-900 py-5 rounded-[1.8rem] font-black text-xl hover:bg-emerald-50 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-emerald-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري المعالجة...
                </>
              ) : 'إرسال التقييم الآن'}
            </button>
          </form>
        ) : (
          <div className="animate-pop-in flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#064e3b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-3xl font-black mb-4">تم الاستلام بنجاح!</h3>
            <p className="text-emerald-100/80 font-bold mb-10 leading-relaxed">شكراً لمشاركتنا رأيك. نحن نقدر ثقتك في حيفان للطاقة وسنعمل جاهدين لنكون دوماً عند حسن ظنكم.</p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setRating(0);
                setComment('');
              }}
              className="text-white/60 font-bold hover:text-white transition-colors border-b border-white/20 pb-1"
            >
              كتابة تقييم آخر
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
