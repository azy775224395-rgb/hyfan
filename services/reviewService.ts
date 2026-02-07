
import { supabase } from '../lib/supabaseClient';
import { Review } from '../types';

export class ReviewService {
  /**
   * Fetch reviews from Supabase and join with Profiles to get names/avatars
   */
  static async fetchReviews(): Promise<Review[]> {
    try {
      if (!supabase) throw new Error("Client not initialized");

      // Join reviews with profiles table
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase Fetch Error:", error);
        return [];
      }

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
    } catch (error) {
      console.error("Critical Fetch Error:", error);
      return [];
    }
  }

  /**
   * Fetch reviews for a SPECIFIC product
   */
  static async fetchProductReviews(productId: string): Promise<Review[]> {
    try {
      if (!supabase) throw new Error("Client not initialized");

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (full_name, avatar_url)
        `)
        .eq('product_id', productId) // Filter by specific product
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase Product Review Fetch Error:", error);
        return [];
      }

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
    } catch (error) {
      console.warn("Product reviews fetch failed:", error);
      return [];
    }
  }

  /**
   * Uploads image to Supabase Storage and creates a review record
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

      // 1. Ensure User Profile Exists in Supabase (Double Check)
      // This is crucial because if AuthSidebar failed to sync, the foreign key constraint will fail here.
      if (userProfile) {
        await supabase.from('profiles').upsert({
          id: userId,
          full_name: userProfile.name,
          avatar_url: userProfile.avatar,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }

      let imageUrl = null;

      // 2. Upload Image if exists
      if (imageFile) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${userId.replace(/[^a-zA-Z0-9]/g, '')}/${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('reviews-images')
            .upload(fileName, imageFile);

          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('reviews-images')
              .getPublicUrl(fileName);
            imageUrl = publicUrl;
          } else {
             console.error("Image Upload Error:", uploadError);
          }
        } catch (e) {
          console.warn("Image upload exception", e);
        }
      }

      // 3. Insert Review Data
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          user_id: userId,
          product_id: productId,
          rating: rating,
          comment: comment,
          image_url: imageUrl
        }])
        .select(`
          *,
          profiles (full_name, avatar_url)
        `)
        .single();

      if (error) {
        alert("فشل في حفظ التقييم بقاعدة البيانات: " + error.message);
        throw error;
      }

      return {
        id: data.id,
        name: data.profiles?.full_name || userProfile?.name || 'عميل حيفان',
        avatar_url: data.profiles?.avatar_url || userProfile?.avatar,
        rating: data.rating,
        comment: data.comment,
        image_url: data.image_url,
        date: new Date(data.created_at).toISOString().split('T')[0]
      };

    } catch (error) {
      console.error("Submit Review Failed:", error);
      return null;
    }
  }
}
