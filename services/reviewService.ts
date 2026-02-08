
import { supabase } from '../lib/supabaseClient';
import { Review } from '../types';

export class ReviewService {
  static async fetchReviews(): Promise<Review[]> {
    try {
      if (!supabase) return [];
      const { data } = await supabase
        .from('reviews')
        .select(`*, profiles (full_name, avatar_url)`)
        .order('created_at', { ascending: false });

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
      if (!supabase) return [];
      const { data } = await supabase
        .from('reviews')
        .select(`*, profiles (full_name, avatar_url)`)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

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
      if (!supabase) throw new Error("Cloud disconnected");

      // 1. Upload Image (Independent step)
      let imageUrl = null;
      if (imageFile) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `review_${Date.now()}.${fileExt}`;
          const { error } = await supabase.storage.from('reviews-images').upload(fileName, imageFile);
          if (!error) {
            const { data } = supabase.storage.from('reviews-images').getPublicUrl(fileName);
            imageUrl = data.publicUrl;
          }
        } catch (e) { console.warn("Image upload skipped"); }
      }

      // 2. Try to Sync Profile
      // We wrap this in a try-catch and proceed even if it fails,
      // because sometimes the user ID exists but we lack permissions to UPDATE it.
      if (userProfile) {
        try {
          await supabase.from('profiles').upsert({
            id: userId,
            full_name: userProfile.name,
            avatar_url: userProfile.avatar,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
        } catch (e) {
          console.warn("Profile sync warning (ignoring):", e);
        }
      }

      // 3. Insert Review
      // Attempt 1: Standard Insert
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
        // If Foreign Key fails, it means the ID is truly missing from profiles.
        // We will try to create a 'stub' profile one last time or fail gracefully.
        console.error("Review Insert Failed:", error);
        
        // Last Resort: Insert without user_id if table allows (Guest Review)
        // OR alert user to re-login.
        if (error.message.includes("foreign key")) {
           // Try to insert the profile forcefully as a new record
           const { error: finalProfileError } = await supabase.from('profiles').insert({
              id: userId,
              full_name: userProfile?.name || 'Guest',
              email: 'guest@temp.com', // Dummy email to satisfy constraints
              role: 'customer'
           });
           
           if (!finalProfileError) {
             // Retry review insert
             const retry = await supabase.from('reviews').insert([{
                user_id: userId, product_id: productId, rating, comment, image_url: imageUrl
             }]).select().single();
             if (retry.data) return { ...retry.data, name: userProfile?.name, date: new Date().toISOString() };
           }
           
           alert("عذراً، نظام التقييم يتطلب تحديث حسابك. يرجى تسجيل الخروج والدخول مرة أخرى.");
           return null;
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
      console.error("Critical Review Error:", error);
      return null;
    }
  }
}
