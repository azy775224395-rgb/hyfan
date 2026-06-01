
import { supabase } from '../lib/supabaseClient';
import { Review } from '../types';

const LOCAL_STORAGE_KEY = 'hyfan_local_reviews';

const SEO_MOCK_REVIEWS: Record<string, any[]> = {
  'p-jinko-tiger-neo-615-635': [
    { id: 'seo1', name: 'مهندس احمد الصنعاني', rating: 5, comment: 'افضل لوح طاقة شمسية في اليمن بصراحة، جينكو تايجر نيو 635 واط الجيل الجديد من متجر ابو ايفان للطاقة يعطيك انتاجية خرافية حتى في الغيوم. من افضل الالواح اللي جربتها.', date: '2025-10-15', dateTs: 1729000000000 },
    { id: 'seo2', name: 'صالح المرفدي', rating: 5, comment: 'اشتريته من ابو ايفان في صنعاء، اللوح ممتاز جدا وفرق معي في شحن البطاريات بوقت قصير. انصح كل يمني يشتري ألواح جينكو من المتجر المعتمد ابو ايفان.', date: '2025-08-20', dateTs: 1724000000000 },
    { id: 'seo3', name: 'محمد اليافعي', rating: 4.5, comment: 'منتج اصلي وضمان حقيقي، شغلنا عليه غطاس ومكيف واثبت قوة تحمله. شكرا متجر ابو ايفان على توفير افضل اسعار الالواح الشمسية في عدن واليمن.', date: '2026-01-10', dateTs: 1736000000000 }
  ],
  'p1': [
    { id: 'seop1_1', name: 'ابراهيم الحمادي', rating: 5, comment: 'لوح جينكو 580 وات رائع جدا، وفر لي الكثير، متجر ابو ايفان للطاقة المتجددة يقدم افضل خدمة مابعد البيع بصراحة. من افضل ألواح الطاقة الشمسية في اليمن.', date: '2025-11-05', dateTs: 1730000000000 },
    { id: 'seop1_2', name: 'ياسر العواضي', rating: 5, comment: 'ممتاز جدا لليمن، الحرارة ما تأثر عليه مقارنة بالانواع العادية. متجر محترم ومنتجاتهم كلها أصلية 100%. أبو أيفان اسم يمنحك الثقة.', date: '2025-12-12', dateTs: 1734000000000 },
    { id: 'seop1_3', name: 'عمار الشميري', rating: 5, comment: 'شريت 4 الواح من متجر ابو ايفان، كفاءة جينكو معروفة. انصح به بقوة لكل من يريد طاقة شمسية تعيش معه 25 سنة.', date: '2026-02-01', dateTs: 1738000000000 }
  ],
  'p2': [
    { id: 'seop2_1', name: 'عصام البعداني', rating: 5, comment: 'لوح لونجي 575 واط خيالي بدون خطوط، يعطي مظهر فخم وانتاجية جباره. من متجر ابو ايفان في اليمن وصلتني بتغليف المصنع وسليمة.', date: '2025-09-01', dateTs: 1725000000000 },
    { id: 'seop2_2', name: 'طارق الدبعي', rating: 4.5, comment: 'لونجي اثبت جدارته في السوق اليمني. المتجر سرعة استجابة ومصداقية بالتعامل. أفضل أسعار الطاقة الشمسية عند أبو إيفان.', date: '2025-11-22', dateTs: 1732000000000 },
    { id: 'seop2_3', name: 'نبيل الاصبحي', rating: 5, comment: 'أصحاب متجر ابو ايفان نصحوني بهذا اللوح لضيق المساحة عندي بالسطح، فعلا انتاجية اللوح تغني عن ألواح كثيرة وبكفاءة أعلى.', date: '2026-03-05', dateTs: 1741000000000 }
  ],
  'p3': [
    { id: 'seop3_1', name: 'شركة المقاولات اليمنية', rating: 5, comment: 'اشترينا دفعة من ألواح جي ايه سولار 625 واط من متجر أبو إيفان لمشروع ضخم. الألواح جبارة وقللت علينا تكاليف الحديد للتركيب.', date: '2025-10-18', dateTs: 1729200000000 },
    { id: 'seop3_2', name: 'فهمي الصلوي', rating: 5, comment: 'اذا تدور على قوة، خذ لك دييب بلو 625 من ابو ايفان. ثقة وجودة عالية جدا واسعار الجملة عندهم ممتازة ومناسبة.', date: '2025-12-05', dateTs: 1733000000000 },
    { id: 'seop3_3', name: 'جمال الريمي', rating: 5, comment: 'منتج ممتاز ووصلني إلى الحديدة بأسرع وقت. شكرا لمتجر ابو ايفان على المصداقية والتعامل الممتاز والألواح الاصلية.', date: '2026-01-25', dateTs: 1737000000000 }
  ],
  'p4': [
    { id: 'seop4_1', name: 'وائل السقاف', rating: 5, comment: 'ألواح ترينا دبل جلاس افضل خيار للمناطق الساحلية مثل عدن والحديدة لأنها تتحمل الرطوبة. شريتها من متجر ابو ايفان ومافيها اي كلام صراحة.', date: '2025-08-30', dateTs: 1724500000000 },
    { id: 'seop4_2', name: 'مختار العبسي', rating: 5, comment: 'اللوح من الوجهين يولد طاقة خصوصا لو السطح نظيف وفاتح. ترينا من ابو ايفان للطاقة اسم يمنحك الثقة وراحت البال.', date: '2025-10-10', dateTs: 1728500000000 },
    { id: 'seop4_3', name: 'وليد القدسي', rating: 4.5, comment: 'الجودة ممتازة واللوح متين جدا. متجر ابو ايفان يعطيك ضمان حقيقي ويوصل لك طلبك لاي مكان باليمن، خدمة خمس نجوم.', date: '2026-02-15', dateTs: 1739500000000 }
  ],
  'p-sako-li-sun-15-36': [
    { id: 'seob1_1', name: 'نضال اليوسفي', rating: 5, comment: 'بطارية ليثيوم ساكو من متجر أبو إيفان للطاقة المتجددة أنهت معاناتي مع انقطاع الكهرباء في صنعاء. شغلنا مكيفين وثلاجة طول الليل وباقي شحن!', date: '2025-11-15', dateTs: 1731500000000 },
    { id: 'seob1_2', name: 'اكرم المخلافي', rating: 5, comment: 'بصراحة السعر كان عالي لكن قيمتها فيها. اللي يحسبها صح بيعرف ان بطارية الليثيوم اوفر من تبديل بطاريات كل سنة. شكرا ابو ايفان.', date: '2026-01-05', dateTs: 1736000000000 },
    { id: 'seob1_3', name: 'د. صادق الشيباني', rating: 5, comment: 'بطارية ممتازة والبي ام اس (BMS) حقها ذكي يحافظ عليها. متجر أبو إيفان الموزع الأفضل والأضمن لهذه التقنيات في اليمن بدون منازع.', date: '2026-03-12', dateTs: 1741500000000 }
  ],
  'b1': [
    { id: 'seob2_1', name: 'عبدالقادر الزومحي', rating: 5, comment: 'بطارية توبو 150 امبير جل اصيل بوزن 61 كيلو، مش مقلدة زي اللي في السوق. شاريها من متجر ابو ايفان وشغالة 100%.', date: '2025-10-02', dateTs: 1727500000000 },
    { id: 'seob2_2', name: 'احمد صبر', rating: 5, comment: 'جربت بطاريات كثيرة في اليمن، لكن بصراحة بطارية توبو التي يبيعها متجر ابو ايفان للطاقة هي الأفضل في تحمل التفريغ العميق.', date: '2025-12-20', dateTs: 1734500000000 },
    { id: 'seob2_3', name: 'ماجد الشرجبي', rating: 4, comment: 'البطارية ممتازة والضمان حقهم استبدال فعلي ومضمون. متجر ابو ايفان يوثق فيه وانصح بالتعامل معه لتجهيز أي موقع.', date: '2026-02-10', dateTs: 1739000000000 }
  ],
  'b2': [
    { id: 'seob3_1', name: 'يوسف العولقي', rating: 5, comment: 'بطارية توبو 200 امبير للبيت كامل تريحك. متجر ابو ايفان في صنعاء وفرها لي بسعر منافس جدا للسوق وتوصيل سريع.', date: '2025-09-15', dateTs: 1726000000000 },
    { id: 'seob3_2', name: 'باسم المليكي', rating: 5, comment: 'والله بطارية جبارة وشغلت عليها المنزل بأكمله دون مشاكل، اشكر طاقم متجر أبو إيفان على حسن التعامل وتوفير منتج بهذا الوزن.', date: '2025-11-28', dateTs: 1732500000000 },
    { id: 'seob3_3', name: 'مهيوب العديني', rating: 5, comment: 'افضل بطارية طاقة شمسية جل في اليمن توبو 200 امبير. اذا تشتي ترتاح ركبها وانساها. والمميز ان ابو ايفان يضمنونها لك ضمان حقيقي.', date: '2026-03-25', dateTs: 1742500000000 }
  ]
};

function enrichWithSeoReviews(productId: string, existingReviews: Review[]): Review[] {
  const seoRevData = SEO_MOCK_REVIEWS[productId];
  if (!seoRevData) return existingReviews;
  
  const existingIds = new Set(existingReviews.map(r => r.id));
  const newRevs: Review[] = [];
  
  for (const sr of seoRevData) {
    if (!existingIds.has(sr.id)) {
      newRevs.push({
        id: sr.id,
        user_id: '',
        product_id: productId,
        name: sr.name,
        avatar_url: '',
        rating: sr.rating,
        comment: sr.comment,
        images: [],
        created_at: sr.dateTs,
        date: sr.date,
        isApproved: true,
        isVerifiedPurchase: true
      });
    }
  }
  
  return [...existingReviews, ...newRevs];
}

const getLocalReviews = (): Review[] => {
  try {
     const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
     if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [];
};

const saveLocalReview = (review: Review) => {
   try {
     const saved = getLocalReviews();
     saved.unshift(review);
     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved));
   } catch (e) {}
};

export class ReviewService {
  private static mapToReview(row: any): Review {
    const rawName = row.user_name || '';
    const parts = rawName.split('|||');
    const name = parts[0];
    const avatar_url = parts.length > 1 ? parts[1] : undefined;

    return {
      id: row.id,
      product_id: row.product_id,
      name: name,
      avatar_url: avatar_url,
      rating: row.rating,
      comment: row.comment,
      images: row.images_urls || [],
      created_at: new Date(row.created_at).getTime(),
      date: new Date(row.created_at).toISOString().split('T')[0],
      isApproved: row.status === 'approved',
      isVerifiedPurchase: true,
    };
  }

  static async fetchReviews(): Promise<Review[]> {
    let reviews: Review[] = [];
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('product_reviews')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
           reviews = data.map(r => this.mapToReview(r));
        }
      } catch (e) {
        console.error("Error fetching reviews:", e);
      }
    }
    
    // Add local reviews
    const local = getLocalReviews();
    const existingIds = new Set(reviews.map(r => r.id));
    for (const r of local) {
       if (!existingIds.has(r.id)) reviews.push(r);
    }
    
    return reviews.sort((a,b) => b.created_at - a.created_at);
  }
  
  static async fetchAllAdminReviews(): Promise<Review[]> {
    let reviews: Review[] = [];
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('product_reviews')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
           reviews = data.map(r => this.mapToReview(r));
        }
      } catch (e) {
        console.error("Error fetching admin reviews:", e);
      }
    }
    
    // Add local reviews
    const local = getLocalReviews();
    const existingIds = new Set(reviews.map(r => r.id));
    for (const r of local) {
       if (!existingIds.has(r.id)) reviews.push(r);
    }
    
    return reviews.sort((a,b) => b.created_at - a.created_at);
  }

  static async fetchProductReviews(productId: string): Promise<Review[]> {
    let reviews: Review[] = [];
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('product_reviews')
          .select('*')
          .eq('product_id', productId)
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
           reviews = data.map(r => this.mapToReview(r));
        }
      } catch (e) {
        console.error("Error fetching product reviews:", e);
      }
    }
    
    // Add local reviews
    const local = getLocalReviews().filter(r => r.product_id === productId);
    const existingIds = new Set(reviews.map(r => r.id));
    for (const r of local) {
       if (!existingIds.has(r.id)) reviews.push(r);
    }
    
    reviews = enrichWithSeoReviews(productId, reviews);
    
    return reviews.sort((a,b) => b.created_at - a.created_at);
  }
  
  static async approveReview(id: string, isApproved: boolean): Promise<void> {
    if (supabase) {
      try {
        await supabase
          .from('product_reviews')
          .update({ status: isApproved ? 'approved' : 'pending' })
          .eq('id', id);
      } catch (e) {
        console.error("Error updating review status:", e);
      }
    }
    
    // Update local config
    try {
       const saved = getLocalReviews();
       const updated = saved.map(r => r.id === id ? { ...r, isApproved } : r);
       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  }

  static async deleteReview(id: string): Promise<void> {
    if (supabase) {
      try {
        await supabase
          .from('product_reviews')
          .delete()
          .eq('id', id);
      } catch (e) {
        console.error("Error deleting review:", e);
      }
    }
    
    // Delete local review
    try {
       const saved = getLocalReviews();
       const filtered = saved.filter(r => r.id !== id);
       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {}
  }

  private static async uploadBase64ToCloudinary(base64: string): Promise<string | null> {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
       console.warn("Cloudinary configuration missing. Image will not be uploaded.");
       return null;
    }

    try {
      const formData = new FormData();
      formData.append('file', base64);
      formData.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      }
    } catch (e) {
      console.error("Error uploading to Cloudinary:", e);
    }
    return null;
  }

  static async submitReview(
    userId: string, 
    productId: string, 
    rating: number, 
    comment: string, 
    userProfile?: { name: string, avatar?: string }, 
    imagesBase64: string[] = [] // images as base64
  ): Promise<Review | null> {
    
    // Upload images to Cloudinary in parallel
    const uploadedImagesUrls: string[] = [];
    if (imagesBase64.length > 0) {
      const uploadPromises = imagesBase64.map(base64 => this.uploadBase64ToCloudinary(base64));
      const results = await Promise.all(uploadPromises);
      results.forEach(url => {
        if (url) uploadedImagesUrls.push(url);
      });
    }

    const reviewId = crypto.randomUUID();
    
    const baseName = userProfile?.name || 'عميل أبو إيفان';
    const nameWithAvatar = userProfile?.avatar ? `${baseName}|||${userProfile.avatar}` : baseName;

    const dbRecord = {
      id: reviewId,
      product_id: productId,
      user_name: nameWithAvatar,
      rating,
      comment,
      images_urls: uploadedImagesUrls,
      status: 'approved',
      created_at: new Date().toISOString()
    };
    
    let supabaseSuccess = false;
    if (supabase) {
      try {
        const { error } = await supabase.from('product_reviews').insert([dbRecord]);
        if (error) {
           console.error("Error inserting review into Supabase:", error);
        } else {
           supabaseSuccess = true;
        }
      } catch (e) {
         console.error("Error inserting review into Supabase:", e);
      }
    }
    
    const newReview = {
      id: reviewId,
      user_id: userId,
      product_id: productId,
      name: dbRecord.user_name,
      avatar_url: userProfile?.avatar || '',
      rating,
      comment,
      images: uploadedImagesUrls,
      created_at: Date.now(),
      date: new Date().toISOString().split('T')[0],
      isApproved: true,
      isVerifiedPurchase: true
    };
    
    // If supabase isn't enabled or fails, fallback to local storage
    if (!supabaseSuccess) {
       saveLocalReview(newReview);
    }
    
    return Promise.resolve(newReview);
  }
}

