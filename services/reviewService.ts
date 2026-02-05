
import { createClient } from '@supabase/supabase-js';
import { Review } from '../types';

// بيانات الربط التي زودنا بها المستخدم
const SUPABASE_URL = 'https://dmkyurpyqhqwoczmdpeb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rjAq009RyqMZ7k1h7TfWDw_T9Xu10zb';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export class ReviewService {
  /**
   * جلب كافة التقييمات من قاعدة البيانات السحابية (Supabase)
   * مرتبة من الأحدث إلى الأقدم
   */
  static async fetchReviews(): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // تحويل البيانات من هيكلية قاعدة البيانات إلى واجهة Review الخاصة بنا
      return (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        rating: item.rating,
        comment: item.comment,
        date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : item.date
      }));
    } catch (error) {
      console.error("خطأ في جلب التقييمات من Supabase:", error);
      // في حال الفشل، نعود ببيانات افتراضية لضمان عمل الواجهة
      return [
        { id: 1, name: "أحمد صالح", rating: 5, comment: "خدمة ممتازة وسرعة في التوصيل لتعز. الألواح جودتها عالية جداً.", date: "2025-02-15" },
        { id: 2, name: "محمد العمري", rating: 5, comment: "المساعد الذكي ساعدني جداً في اختيار البطارية المناسبة. أنصح بالتعامل معهم.", date: "2025-02-10" }
      ];
    }
  }

  /**
   * إضافة تقييم جديد إلى جدول التقييمات في السحابة
   */
  static async addReview(review: Review): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            name: review.name,
            rating: review.rating,
            comment: review.comment,
            date: review.date
          }
        ]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("خطأ في حفظ التقييم في Supabase:", error);
      return false;
    }
  }
}
