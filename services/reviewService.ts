
import { supabase } from '../lib/supabaseClient';
import { Review } from '../types';

export class ReviewService {
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

      // --- CRITICAL FIX: Ensure User Exists in Profiles Table ---
      if (userProfile) {
        // Use Upsert: Insert if not exists, Update if exists.
        // This satisfies the Foreign Key constraint for 'reviews'
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            full_name: userProfile.name,
            avatar_url: userProfile.avatar,
            updated_at: new Date().toISOString()
            // We do NOT set role here to avoid overwriting existing admins
          }, { onConflict: 'id' });

        if (profileError) {
          console.error("Profile Upsert Error:", profileError);
          // Proceed anyway, maybe the profile exists and the error is RLS related
        }
      }

      // --- Upload Image ---
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

      // --- Insert Review ---
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
          // If upsert failed silently earlier, we try one last explicit insert attempt
           if (userProfile) {
              await supabase.from('profiles').insert([{
                 id: userId, 
                 full_name: userProfile.name, 
                 avatar_url: userProfile.avatar
              }]);
              // Retry review insert logic could go here, but usually asking user to retry is safer
              alert("حدث خطأ في مزامنة الحساب. يرجى المحاولة مرة أخرى الآن.");
              return null;
           }
           alert("خطأ: حسابك غير مسجل في قاعدة البيانات. يرجى تسجيل الخروج والدخول مجدداً.");
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
