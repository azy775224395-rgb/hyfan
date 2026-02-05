
import { createClient } from '@supabase/supabase-js';
import { Review } from '../types';

// القيم المباشرة للربط السحابي (Supabase)
const SUPABASE_URL = 'https://dmkyurpyqhqwoczmdpeb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rjAq009RyqMZ7k1h7TfWDw_T9Xu10zb';

// تهيئة العميل مع معالجة الأخطاء لمنع تعطل الموقع بالكامل
let supabase: any = null;
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (error) {
  console.error("Supabase Connection Error:", error);
}

export class ReviewService {
  private static STORAGE_KEY = 'hyfan_cloud_sync_backup';

  /**
   * جلب التقييمات: يحاول السحابة أولاً، وإذا فشلت يعود للتخزين المحلي
   */
  static async fetchReviews(): Promise<Review[]> {
    try {
      if (!supabase) throw new Error("Client not initialized");

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedReviews = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          rating: item.rating,
          comment: item.comment,
          date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : item.date
        }));
        // تحديث النسخة المحلية للعمل بها عند انقطاع الإنترنت مستقبلاً
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mappedReviews));
        return mappedReviews;
      }
      return [];
    } catch (error) {
      console.warn("Cloud access failed, using local fallback:", error);
      const saved = localStorage.getItem(this.STORAGE_KEY);
      // إذا لم يوجد شيء محلياً، نرجع بيانات تجريبية افتراضية
      return saved ? JSON.parse(saved) : [
        { id: 1, name: "أحمد صالح", rating: 5, comment: "خدمة ممتازة وسرعة في التوصيل لتعز. الألواح جودتها عالية جداً.", date: "2025-02-15" },
        { id: 2, name: "محمد العمري", rating: 5, comment: "المساعد الذكي ساعدني جداً في اختيار البطارية المناسبة. أنصح بالتعامل معهم.", date: "2025-02-10" }
      ];
    }
  }

  /**
   * إضافة تقييم: يرسل للسحابة فوراً
   */
  static async addReview(review: Review): Promise<boolean> {
    try {
      if (!supabase) throw new Error("Cloud not connected");

      const { error } = await supabase
        .from('reviews')
        .insert([{
          name: review.name,
          rating: review.rating,
          comment: review.comment,
          date: review.date
        }]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Cloud Save Failed:", error);
      // في حال الفشل نحفظه محلياً لكي لا يضيع مجهود العميل
      const current = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([review, ...current]));
      return true; 
    }
  }
}
