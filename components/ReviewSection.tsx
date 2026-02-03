
import React, { useState } from 'react';
import { Review } from '../types';

const MOCK_REVIEWS: Review[] = [
  { id: 1, name: "أحمد صالح", rating: 5, comment: "خدمة ممتازة وسرعة في التوصيل لتعز. الألواح جودتها عالية جداً.", date: "2025-02-15" },
  { id: 2, name: "محمد العمري", rating: 5, comment: "المساعد الذكي ساعدني جداً في اختيار البطارية المناسبة. أنصح بالتعامل معهم.", date: "2025-02-10" },
  { id: 3, name: "سارة خالد", rating: 4, comment: "ثلاجة الإنفرتر ممتازة وتوفر طاقة بشكل ملحوظ. شكراً حيفان.", date: "2025-02-01" },
  { id: 4, name: "عبدالله اليافعي", rating: 5, comment: "أفضل أسعار في عدن بدون منازع.", date: "2025-01-28" },
  { id: 5, name: "فؤاد هزاع", rating: 5, comment: "منظومة 5 كيلو تعمل بكفاءة عالية جداً، التركيب كان سريعاً.", date: "2025-01-25" },
  { id: 6, name: "إيمان عبدالله", rating: 4, comment: "منتجات VOLX جودتها ممتازة جداً للمنازل.", date: "2025-01-20" },
  { id: 7, name: "خالد بن ناصر", rating: 5, comment: "تعامل راقي وضمانة حقيقية، تم استبدال بطارية لي في تعز فوراً.", date: "2025-01-15" },
  { id: 8, name: "صلاح الدين", rating: 5, comment: "شكراً حيفان للطاقة، الإنارة لم تنقطع منذ التركيب.", date: "2025-01-10" },
  { id: 9, name: "منصور الحاشدي", rating: 5, comment: "التوصيل لصنعاء كان في نفس اليوم، تجربة رائعة.", date: "2025-01-05" },
  { id: 10, name: "ياسين قاسم", rating: 5, comment: "أنصح ببطاريات التيوبو جداً قوية وتحملت الضغط.", date: "2025-01-01" },
  { id: 11, name: "هاني السويدي", rating: 4, comment: "حاسبة الطاقة دقيقة جداً وساعدتني في التخطيط.", date: "2024-12-25" },
  { id: 12, name: "ليلى مختار", rating: 5, comment: "خدمة ما بعد البيع متميزة جداً.", date: "2024-12-20" },
  { id: 13, name: "جلال الصنعاني", rating: 5, comment: "فخورين بوجود مثل هذا المتجر الاحترافي في اليمن.", date: "2024-12-15" },
  { id: 14, name: "بسام المحمدي", rating: 5, comment: "الطباخات التركية جودتها لا توصف.", date: "2024-12-10" },
  { id: 15, name: "نبيل القدسي", rating: 4, comment: "أسعار البطاريات منافسة جداً.", date: "2024-12-05" },
  { id: 16, name: "سامية العنسي", rating: 5, comment: "تعامل مريح جداً عبر واتساب.", date: "2024-12-01" },
  { id: 17, name: "حمزة إدريس", rating: 5, comment: "الألواح تعمل بكفاءة حتى في الجو الغائم.", date: "2024-11-25" },
  { id: 18, name: "راوية الجبلي", rating: 5, comment: "شكراً على النصيحة الفنية قبل الشراء.", date: "2024-11-20" },
  { id: 19, name: "عاصم الشرجبي", rating: 5, comment: "الإنفرتر الـ 5 كيلو جرووات جبار.", date: "2024-11-15" },
  { id: 20, name: "وسيم القباطي", rating: 5, comment: "حلول طاقة متكاملة واحترافية.", date: "2024-11-10" }
];

interface ReviewSectionProps {
  onShowAll: (reviews: Review[]) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ onShowAll }) => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !name.trim() || !comment.trim()) {
      alert('يرجى ملء جميع الحقول واختيار التقييم');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now(),
        name,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([newReview, ...reviews]);
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setComment('');
      setRating(0);
    }, 1200);
  };

  return (
    <section className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border border-emerald-50 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
        {/* Review Form */}
        <div className="bg-emerald-900 rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">قيم تجربتك</h2>
            <p className="text-emerald-100/70 font-bold mb-10 leading-relaxed">أخبرنا عن رأيك في منتجات حيفان</p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسمك الكامل"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 outline-none focus:ring-4 focus:ring-emerald-400/20 transition-all font-bold"
                />

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
                  placeholder="كيف كانت تجربتك؟"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 outline-none focus:ring-4 focus:ring-emerald-400/20 transition-all min-h-[120px] font-bold"
                />

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-emerald-900 py-5 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-xl active:scale-95 text-lg"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'نشر التقييم'}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-3xl font-black mb-2">شكراً لثقتك!</h3>
                <p className="text-emerald-100/70 text-lg">تمت إضافة تقييمك بنجاح في القائمة.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-white underline font-bold">إضافة تقييم آخر</button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-950">آراء العملاء</h3>
            <button 
              onClick={() => onShowAll(reviews)}
              className="text-emerald-600 font-black text-sm md:text-base hover:underline flex items-center gap-2"
            >
              عرض كافة التقييمات ({reviews.length})
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-emerald-50 shadow-sm hover:shadow-md transition-all group">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
