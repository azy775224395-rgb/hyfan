
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

      if (error) throw error;

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
      console.warn("Cloud access failed, falling back to local:", error);
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
    imageFile?: File
  ): Promise<Review | null> {
    try {
      if (!supabase) throw new Error("Cloud not connected");

      let imageUrl = null;

      // 1. Upload Image if exists
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${userId}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('reviews-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('reviews-images')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      // 2. Insert Review Data
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

      if (error) throw error;

      return {
        id: data.id,
        name: data.profiles?.full_name || 'عميل حيفان',
        avatar_url: data.profiles?.avatar_url,
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
