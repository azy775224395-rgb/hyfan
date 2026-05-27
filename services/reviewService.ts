
import { supabase } from '../lib/supabaseClient';
import { Review } from '../types';

export class ReviewService {
  private static mapToReview(row: any): Review {
    return {
      id: row.id,
      product_id: row.product_id,
      name: row.user_name,
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
    if (!supabase) return [];
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []).map(this.mapToReview);
    } catch (e) {
      console.error("Error fetching reviews:", e);
      return [];
    }
  }
  
  static async fetchAllAdminReviews(): Promise<Review[]> {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []).map(this.mapToReview);
    } catch (e) {
      console.error("Error fetching admin reviews:", e);
      return [];
    }
  }

  static async fetchProductReviews(productId: string): Promise<Review[]> {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []).map(this.mapToReview);
    } catch (e) {
      console.error("Error fetching product reviews:", e);
      return [];
    }
  }
  
  static async approveReview(id: string, isApproved: boolean): Promise<void> {
    if (!supabase) return;
    try {
      await supabase
        .from('product_reviews')
        .update({ status: isApproved ? 'approved' : 'pending' })
        .eq('id', id);
    } catch (e) {
      console.error("Error updating review status:", e);
    }
  }

  static async deleteReview(id: string): Promise<void> {
    if (!supabase) return;
    try {
      await supabase
        .from('product_reviews')
        .delete()
        .eq('id', id);
    } catch (e) {
      console.error("Error deleting review:", e);
    }
  }

  private static async uploadBase64ToCloudinary(base64: string): Promise<string | null> {
    const cloudName = (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = (import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
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
    
    const dbRecord = {
      id: reviewId,
      product_id: productId,
      user_name: userProfile?.name || 'عميل حيفان',
      rating,
      comment,
      images_urls: uploadedImagesUrls,
      status: 'pending'
    };
    
    if (supabase) {
      try {
        const { error } = await supabase.from('product_reviews').insert([dbRecord]);
        if (error) console.error("Error inserting review into Supabase:", error);
      } catch (e) {
         console.error("Error inserting review into Supabase:", e);
      }
    }
    
    return Promise.resolve({
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
      isApproved: false,
      isVerifiedPurchase: true
    });
  }
}
