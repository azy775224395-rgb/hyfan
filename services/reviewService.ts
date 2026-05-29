
import { supabase } from '../lib/supabaseClient';
import { Review } from '../types';

const LOCAL_STORAGE_KEY = 'hyfan_local_reviews';

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
    
    const dbRecord = {
      id: reviewId,
      product_id: productId,
      user_name: userProfile?.name || 'عميل حيفان',
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

