
import React, { useEffect, useState, useRef } from 'react';
import { Product, Review, UserProfile } from '../types';
import SEO from './SEO';
import ProductSchema from './ProductSchema';
import { ReviewService } from '../services/reviewService';
import { NotificationService } from '../services/notificationService';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onOrderNow: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart, onOrderNow, formatPrice }) => {
  // State for Real Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  
  // State for Review Form
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Stats for Schema
  const [averageRating, setAverageRating] = useState<number | undefined>(undefined);
  
  // Scroll to top on mount and fetch reviews
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load User
    const savedUser = localStorage.getItem('hyfan_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // Load Reviews for THIS product
    const loadData = async () => {
      setLoadingReviews(true);
      const data = await ReviewService.fetchProductReviews(product.id);
      setReviews(data);
      
      // Calculate Average
      if (data.length > 0) {
        const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
        setAverageRating(sum / data.length);
      }
      
      setLoadingReviews(false);
    };
    loadData();
  }, [product.id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      if (confirm('يجب عليك تسجيل الدخول أولاً لإضافة تقييم. هل تود الذهاب لصفحة الدخول؟')) {
        window.location.hash = '#/auth';
      }
      return;
    }
    
    if (rating === 0) return alert("يرجى اختيار عدد النجوم");
    
    setIsSubmitting(true);
    // Updated call to include user profile for fallback
    const newReview = await ReviewService.submitReview(
      user.id, 
      product.id, 
      rating, 
      comment,
      { name: user.name, avatar: user.avatar }
    );
    
    if (newReview) {
      setReviews([newReview, ...reviews]);
      setReviewSubmitted(true);
      // Recalculate average immediately for UI update
      const newTotal = reviews.length + 1;
      const newSum = (averageRating ? averageRating * reviews.length : 0) + rating;
      setAverageRating(newSum / newTotal);
      
      NotificationService.sendTelegramNotification(
        `⭐ تقييم جديد للمنتج: ${product.name}\n👤 العميل: ${user.name}\n💬 التعليق: ${comment}`
      );
    } else {
      alert("حدث خطأ أثناء إرسال التقييم");
    }
    setIsSubmitting(false);
  };

  return (
    <article className="min-h-screen bg-[#f8fafc] animate-slide-up flex flex-col pb-24 md:pb-0">
      <SEO 
        title={product.name}
        description={product.fullDescription || product.description}
        image={product.image}
        type="product"
      />
      
      {/* Dynamic Google Merchant Schema with REAL DATA */}
      <ProductSchema 
        name={product.name}
        description={product.fullDescription || product.description}
        image={product.image}
        price={product.price}
        currency="SAR"
        sku={product.id}
        brand="حيفان للطاقة"
        ratingValue={averageRating}
        reviewCount={reviews.length}
      />

      {/* Glassy Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 -mr-2 text-emerald-950 hover:bg-emerald-50 rounded-full transition-colors flex items-center gap-2 font-black"
            aria-label="العودة"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span className="text-sm">العودة</span>
          </button>
          
          <h1 className="text-sm font-black text-emerald-950 truncate max-w-[200px]">{product.name}</h1>
          
          <button className="p-2 rounded-full hover:bg-emerald-50 text-emerald-600">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Product Image Section */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="relative aspect-square bg-white rounded-[2.5rem] p-8 flex items-center justify-center border border-white shadow-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 to-transparent opacity-50" />
            <img 
              src={product.image} 
              alt={product.name} 
              className="relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" 
              loading="eager"
              fetchPriority="high"
            />
            {product.status && (
              <span className="absolute top-6 right-6 bg-amber-400 text-amber-950 px-4 py-2 rounded-full font-black text-xs shadow-lg border border-white/20 z-20">
                {product.status}
              </span>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              ضمان الوكيل
            </span>
          </div>
          
          <h2 className="text-2xl md:text-5xl font-black text-emerald-950 mb-4 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl font-black text-emerald-700 leading-none">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-400 line-through font-bold mb-1">
              {formatPrice(product.price * 1.2)}
            </span>
            <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded text-[10px] font-black mb-1">
              وفر 20%
            </span>
          </div>
          
          {/* Average Rating Display */}
          <div className="flex items-center gap-2 mb-6">
             <div className="flex text-amber-400">
               {[1,2,3,4,5].map(star => (
                 <svg key={star} className={`w-5 h-5 ${averageRating && star <= Math.round(averageRating) ? 'fill-amber-400' : 'fill-gray-200 text-gray-200'}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               ))}
             </div>
             <span className="text-sm font-bold text-gray-500">
               {averageRating ? `(${averageRating.toFixed(1)}) ${reviews.length} تقييم` : 'لا يوجد تقييمات بعد'}
             </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm mb-8">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">الوصف المختصر</h3>
             <p className="text-gray-600 leading-relaxed font-medium text-lg">
               {product.fullDescription || product.description}
             </p>
          </div>

          {/* Long Form Persuasive Content (SEO Rich) */}
          {product.longDescription && (
            <div className="mb-8 prose prose-emerald prose-p:text-gray-600 prose-headings:font-black max-w-none bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50">
               <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
            </div>
          )}

          {product.specs && (
            <div className="mb-8">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 px-2">المواصفات التقنية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-emerald-900 bg-white p-4 rounded-2xl border border-gray-100 font-bold shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review Section */}
          <div className="mb-8 border-t border-gray-100 pt-8" id="reviews">
            <h3 className="text-xl font-black text-emerald-950 mb-6">تقييمات العملاء</h3>
            
            {/* Write Review Form */}
            {!reviewSubmitted ? (
              <form onSubmit={handleSubmitReview} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
                <h4 className="font-bold text-sm mb-4 text-gray-500">أضف تقييمك لهذا المنتج</h4>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform active:scale-95"
                    >
                      <svg 
                        className={`w-8 h-8 ${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
                        viewBox="0 0 24 24" 
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </button>
                  ))}
                </div>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="شاركنا تجربتك مع هذا المنتج..."
                  className="w-full bg-gray-50 rounded-xl p-3 text-sm font-bold border border-transparent focus:bg-white focus:border-emerald-300 outline-none transition-all h-24 mb-4"
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-black text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري النشر...' : 'نشر التقييم'}
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl mb-8 text-center font-bold text-sm">
                شكراً لك! تم إضافة تقييمك بنجاح.
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {loadingReviews ? (
                <div className="text-center text-gray-400 text-sm py-4">جاري تحميل التقييمات...</div>
              ) : reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold shrink-0">
                      {review.avatar_url ? <img src={review.avatar_url} className="w-full h-full rounded-full object-cover" /> : review.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-sm text-emerald-950">{review.name}</span>
                        <div className="flex gap-0.5">
                           {[...Array(review.rating)].map((_, i) => (
                             <svg key={i} className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                           ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm font-medium">{review.comment}</p>
                      <span className="text-[10px] text-gray-300 font-bold mt-1 block">{review.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm py-4 bg-gray-50 rounded-2xl">
                  لا توجد تقييمات لهذا المنتج بعد. كن أول من يقيم!
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop Actions (Hidden on Mobile) */}
          <div className="hidden lg:flex gap-4 mt-auto pt-8 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => onOrderNow(product)}
              className="flex-1 bg-emerald-950 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all shadow-xl active:scale-95 text-lg"
            >
              شراء فوري
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button 
              type="button"
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-white text-emerald-900 border-2 border-emerald-900 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all active:scale-95 text-lg"
            >
              أضف للسلة
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Actions Bar (Thumb Friendly) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 pb-8 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] flex gap-3 animate-slide-up">
         <button 
            type="button"
            onClick={() => onAddToCart(product)}
            className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center border border-emerald-200 active:scale-90 transition-transform"
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
         </button>
         <button 
            type="button"
            onClick={() => onOrderNow(product)}
            className="flex-grow bg-emerald-950 text-white rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
         >
            شراء فوري بـ {formatPrice(product.price)}
         </button>
      </div>
    </article>
  );
};

export default ProductDetail;
