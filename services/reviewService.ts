
import { supabase } from '../lib/supabaseClient';
import { Review } from '../types';

export class ReviewService {
  /**
   * Fetch reviews
   */
  static async fetchReviews(): Promise<Review[]> {
    try {
      if (!supabase) throw new Error("Client not initialized");
      const { data, error } = await supabase
        .from('reviews')
        .select(`*, profiles (full_name, avatar_url)`)
        .order('created_at', { ascending: false });

      if (error) return [];
      if (data) {
        return data.map((item: any) => ({
          id: item.id,
          name: item.profiles?.full_name || 'عميل حيفان',
          avatar_url: item.profiles?.avatar_url,
          rating: item.rating,
          comment: item.comment,
          image_url: item.image_url,
          date: new Date(item.created_at).toISOString().split('T')[0]
        }));
      }
      return [];
    } catch { return []; }
  }

  static async fetchProductReviews(productId: string): Promise<Review[]> {
    try {
      if (!supabase) throw new Error("Client not initialized");
      const { data, error } = await supabase
        .from('reviews')
        .select(`*, profiles (full_name, avatar_url)`)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) return [];
      if (data) {
        return data.map((item: any) => ({
          id: item.id,
          name: item.profiles?.full_name || 'عميل حيفان',
          avatar_url: item.profiles?.avatar_url,
          rating: item.rating,
          comment: item.comment,
          image_url: item.image_url,
          date: new Date(item.created_at).toISOString().split('T')[0]
        }));
      }
      return [];
    } catch { return []; }
  }

  /**
   * Submit review with robust profile checking
   */
  static async submitReview(
    userId: string, 
    productId: string, 
    rating: number, 
    comment: string, 
    userProfile?: { name: string, avatar?: string }, 
    imageFile?: File
  ): Promise<Review | null> {
    try {
      if (!supabase) throw new Error("Cloud not connected");
      if (!userId) {
        alert("خطأ: يرجى تسجيل الدخول.");
        return null;
      }

      // --- STEP 1: Ensure User Exists in Profiles Table ---
      // We do this explicitly to avoid silent Upsert failures due to RLS
      
      // A. Check if user exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (!existingUser && userProfile) {
        // B. If not exists, insert
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: userId,
            full_name: userProfile.name,
            avatar_url: userProfile.avatar,
            updated_at: new Date().toISOString()
          }]);
        
        if (insertError) {
          console.error("Profile Creation Error:", insertError);
          // If insert fails, it might be RLS. We can't proceed with review safely.
          // However, we'll try to proceed anyway hoping the check was a false negative.
        }
      } else if (existingUser && userProfile) {
         // C. If exists, try update (optional, ignore error)
         await supabase.from('profiles').update({
            full_name: userProfile.name,
            avatar_url: userProfile.avatar,
            updated_at: new Date().toISOString()
         }).eq('id', userId);
      }

      // --- STEP 2: Handle Image ---
      let imageUrl = null;
      if (imageFile) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${userId.replace(/[^a-zA-Z0-9]/g, '')}/${Date.now()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage.from('reviews-images').upload(fileName, imageFile);
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage.from('reviews-images').getPublicUrl(fileName);
            imageUrl = publicUrl;
          }
        } catch (e) { console.warn("Image upload failed", e); }
      }

      // --- STEP 3: Insert Review ---
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          user_id: userId,
          product_id: productId,
          rating: rating,
          comment: comment,
          image_url: imageUrl
        }])
        .select(`*, profiles (full_name, avatar_url)`)
        .single();

      if (error) {
        console.error("Review Insert Error:", error);
        if (error.message.includes("foreign key")) {
          alert("فشل الحفظ: حساب المستخدم غير مفعل في قاعدة البيانات. يرجى التواصل مع الإدارة لتفعيل حسابك.");
        } else {
          alert("فشل حفظ التقييم: " + error.message);
        }
        throw error;
      }

      return {
        id: data.id,
        name: data.profiles?.full_name || userProfile?.name || 'عميل',
        avatar_url: data.profiles?.avatar_url,
        rating: data.rating,
        comment: data.comment,
        image_url: data.image_url,
        date: new Date(data.created_at).toISOString().split('T')[0]
      };

    } catch (error) {
      return null;
    }
  }
}
