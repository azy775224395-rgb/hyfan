import React, { useEffect, useState, useRef } from "react";
import { Product, Review, UserProfile } from "../types";
import SEO from "./SEO";
import ProductSchema from "./ProductSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";
import { ReviewService } from "../services/reviewService";
import { NotificationService } from "../services/notificationService";
import RelatedProductsBar from "./RelatedProductsBar";

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  user: UserProfile | null; // Receive user as prop
  onClose: () => void;
  onAddToCart: (p: Product, qty?: number) => void;
  onOrderNow: (p: Product) => void;
  formatPrice: (p: number) => string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  allProducts,
  user,
  onClose,
  onAddToCart,
  onOrderNow,
  formatPrice,
}) => {
  // State for Real Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [buyerData, setBuyerData] = useState({
    name: user?.name || "",
    location: "",
  });

  // State for Review Form
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Stats for Schema
  const [averageRating, setAverageRating] = useState<number | undefined>(
    undefined,
  );

  // Scroll to top on mount and fetch reviews
  useEffect(() => {
    window.scrollTo(0, 0);

    // Load Reviews for THIS product
    const loadData = async () => {
      setLoadingReviews(true);
      const data = await ReviewService.fetchProductReviews(product.id);
      setReviews(data);

      // Calculate Average for Schema and UI
      if (data.length > 0) {
        const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
        setAverageRating(sum / data.length);
      } else {
        setAverageRating(undefined);
      }

      setLoadingReviews(false);
    };
    loadData();
  }, [product.id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      if (
        confirm(
          "يجب عليك تسجيل الدخول أولاً لإضافة تقييم. هل تود الذهاب لصفحة الدخول؟",
        )
      ) {
        window.location.hash = "#/auth";
      }
      return;
    }

    if (rating === 0) return alert("يرجى اختيار عدد النجوم");

    setIsSubmitting(true);

    const newReview = await ReviewService.submitReview(
      user.id,
      product.id,
      rating,
      comment,
      { name: user.name, avatar: user.avatar },
    );

    if (newReview) {
      const updatedList = [newReview, ...reviews];
      setReviews(updatedList);
      setReviewSubmitted(true);

      // Recalculate average immediately
      const newTotal = updatedList.length;
      const newSum = updatedList.reduce((acc, curr) => acc + curr.rating, 0);
      setAverageRating(newSum / newTotal);

      NotificationService.sendTelegramNotification(
        `⭐ تقييم جديد للمنتج: ${product.name}\n👤 العميل: ${user.name}\n💬 التعليق: ${comment}`,
      );
    }
    setIsSubmitting(false);
  };

  const WHATSAPP_NUMBER = "967784400333";

  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerData.name || !buyerData.location) {
      alert("يرجى تعبئة الاسم والموقع");
      return;
    }

    let orderSummary = "السلام عليكم، أريد الشراء الفوري للمنتج التالي:\n\n";
    orderSummary += `📦 *المنتج:* ${product.name} (عدد: ${quantity})\n`;
    orderSummary += `💰 *السعر:* ${formatPrice(product.price * quantity)}\n\n`;
    orderSummary += `*بيانات المشتري:*\n👤 الاسم: ${buyerData.name}\n📍 الموقع: ${buyerData.location}`;

    const encodedMessage = encodeURIComponent(orderSummary);
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  const baseUrl = window.location.origin + window.location.pathname;

  // mapping product category to generic slug
  const catSlug = product.category === 'الالواح الشمسيه' ? 'solar-panels'
                : product.category === 'البطاريات' ? 'batteries'
                : product.category === 'الانفرترات' ? 'off-grid-inverters'
                : 'latest';

  return (
    <article className="min-h-screen bg-[#f8fafc] animate-slide-up flex flex-col pb-24 md:pb-0">
      <SEO
        title={product.name}
        description={(product.fullDescription || product.description).substring(0, 155) + '...'}
        image={product.image}
        type="product"
      />
      <BreadcrumbSchema 
        items={[
          { name: "الرئيسية", item: `${baseUrl}#/` },
          { name: product.category, item: `${baseUrl}#/category/${catSlug}` },
          { name: product.name, item: `${baseUrl}#/product/${product.id}` }
        ]} 
      />

      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 w-full max-w-md relative animate-slide-up">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="text-2xl font-black text-emerald-950 mb-6 border-r-4 border-emerald-600 pr-3">
              بيانات المشتري
            </h3>
            <form onSubmit={handleCheckoutWhatsApp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">
                  الاسم الكريم
                </label>
                <input
                  required
                  type="text"
                  value={buyerData.name}
                  onChange={(e) =>
                    setBuyerData({ ...buyerData, name: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-emerald-600 font-bold"
                  placeholder="الاسم"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">
                  الموقع (المدينة, الحي)
                </label>
                <input
                  required
                  type="text"
                  value={buyerData.location}
                  onChange={(e) =>
                    setBuyerData({ ...buyerData, location: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-emerald-600 font-bold"
                  placeholder="صنعاء - التحرير"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-lg hover:bg-emerald-700 transition-all mt-4"
              >
                متابعة الشراء (واتساب)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Google Merchant Schema with REAL DATA */}
      <ProductSchema
        name={product.name}
        description={product.fullDescription || product.description}
        image={product.image}
        price={product.price}
        currency="SAR"
        sku={product.id}
        brand="أبو إيفان للطاقة المتجددة"
        ratingValue={averageRating}
        reviewCount={reviews.length}
      />

      {/* Glassy Navbar */}
      <nav
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-slate-800 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-2 font-black"
            aria-label="العودة"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            <span className="text-sm">العودة</span>
          </button>

          <h1 className="text-sm font-black text-slate-800 truncate max-w-[200px]">
            {product.name}
          </h1>

          <button className="p-2 rounded-full hover:bg-gray-50 text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Product Image Section */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="relative aspect-square bg-white rounded-[2.5rem] p-8 flex items-center justify-center border border-gray-100 shadow-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-50" />
            <img
              src={product.image}
              alt={`صورة ${product.name} - متجر أبو إيفان للطاقة المتجددة لـ حلول الطاقة الشمسية`}
              className="relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              loading="eager"
              fetchPriority="high"
            />
            {product.status && (
              <span className="absolute top-6 right-6 bg-accent text-white px-4 py-2 rounded-full font-black text-xs shadow-lg z-20">
                {product.status}
              </span>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">
              ضمان الوكيل
            </span>
          </div>

          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl font-black text-primary leading-none">
              {formatPrice(product.price)}
            </span>
            {product.price && (
              <span className="text-sm text-gray-400 line-through font-bold mb-1">
                {formatPrice(product.price * 1.2)}
              </span>
            )}
          </div>

          {/* Average Rating Display */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${averageRating && star <= Math.round(averageRating) ? "fill-amber-400" : "fill-gray-200 text-gray-200"}`}
                  viewBox="0 0 24 24"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-gray-500">
              {averageRating
                ? `(${averageRating.toFixed(1)}) ${reviews.length} تقييم`
                : "لا يوجد تقييمات بعد"}
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">
              الوصف المختصر
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium text-lg">
              {product.fullDescription || product.description}
            </p>
          </div>

          {/* Long Form Persuasive Content (SEO Rich) */}
          {product.longDescription && (
            <div className="mb-8 prose prose-emerald prose-p:text-gray-600 prose-headings:font-black max-w-none bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50">
              <div
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            </div>
          )}

          {product.specs && (
            <div className="mb-8">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 px-2">
                المواصفات التقنية
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-emerald-900 bg-white p-4 rounded-2xl border border-gray-100 font-bold shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review Section */}
          <div className="mb-8 border-t border-gray-100 pt-8" id="reviews">
            <h3 className="text-xl font-black text-emerald-950 mb-6">
              تقييمات العملاء
            </h3>

            {/* Reviews List */}
            <div className="space-y-4 mb-6">
              {loadingReviews ? (
                <div className="text-center text-gray-400 text-sm py-4">
                  جاري تحميل التقييمات...
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold shrink-0 overflow-hidden">
                      {review.avatar_url ? (
                        <img
                          src={review.avatar_url}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        review.name[0]
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-sm text-emerald-950">
                          {review.name}
                        </span>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-3 h-3 text-amber-400 fill-amber-400"
                              viewBox="0 0 24 24"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm font-medium">
                        {review.comment}
                      </p>
                      <span className="text-[10px] text-gray-300 font-bold mt-1 block">
                        {review.date}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm py-4 bg-gray-50 rounded-2xl">
                  لا توجد تقييمات لهذا المنتج بعد. كن أول من يقيم!
                </div>
              )}
            </div>

            {/* Write Review Form */}
            {!reviewSubmitted ? (
              <form
                onSubmit={handleSubmitReview}
                className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 w-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <h4 className="font-bold text-sm text-gray-500">
                    أضف تقييمك
                  </h4>
                  <div className="flex gap-1.5">
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
                          className={`w-6 h-6 ${(hoverRating || rating) >= star ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-200"}`}
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="رأيك يهمنا..."
                    className="w-full bg-white rounded-lg p-2 text-xs font-bold border border-gray-200 focus:border-emerald-300 outline-none transition-all h-20 resize-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 text-white px-4 rounded-lg font-black text-xs hover:bg-emerald-700 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
                  >
                    {isSubmitting ? "نشر..." : "إرسال"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-center font-bold text-xs">
                شكراً لك! تم إضافة تقييمك بنجاح.
              </div>
            )}
          </div>

          {/* Desktop Actions (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col gap-4 mt-auto pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-500">الكمية:</span>
              <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-lg font-black text-gray-700 hover:text-emerald-600 active:scale-95 transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-lg text-emerald-950">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-lg font-black text-gray-700 hover:text-emerald-600 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-4 items-stretch">
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(true)}
                className="flex-1 bg-emerald-950 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all shadow-xl active:scale-95 text-lg"
              >
                شراء فوري
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-white text-emerald-900 border-2 border-emerald-900 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all active:scale-95 text-lg"
              >
                أضف للسلة
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProductsBar
        products={allProducts.filter(
          (p) => p.category === product.category && p.id !== product.id,
        )}
        onViewDetails={(p) => {
          window.location.hash = `#/product/${p.id}`;
        }}
        formatPrice={formatPrice}
      />

      {/* Mobile Sticky Actions Bar (Thumb Friendly) */}
      <div className="lg:hidden fixed bottom-[72px] left-0 w-full bg-white/95 backdrop-blur-xl border-t border-b border-gray-200 p-3 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col gap-2 animate-slide-up">
        <div className="flex items-center justify-between px-1">
          <span className="font-bold text-gray-500 text-sm">الكمية:</span>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm text-lg font-black text-gray-700 hover:text-emerald-600 active:scale-95 transition-all"
            >
              -
            </button>
            <span className="w-10 text-center font-black text-emerald-950">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm text-lg font-black text-gray-700 hover:text-emerald-600 active:scale-95 transition-all"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-2 h-14">
          <button
            type="button"
            onClick={() => onAddToCart(product, quantity)}
            className="flex-1 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center gap-2 border border-emerald-200 active:scale-90 transition-transform font-black text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            أضف للسلة
          </button>
          <button
            type="button"
            onClick={() => setIsCheckoutModalOpen(true)} // order now directly
            className="flex-1 bg-emerald-950 text-white rounded-2xl font-black text-sm md:text-base shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            شراء فوري
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;
