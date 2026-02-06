
import { supabase } from '../lib/supabaseClient';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

export class ProductService {
  private static STORAGE_KEY = 'hyfan_products_cache';

  static async getLiveProducts(): Promise<Product[]> {
    try {
      if (!supabase) throw new Error("No Cloud Connection");

      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        return data;
      }
      return INITIAL_PRODUCTS;
    } catch (error) {
      console.warn("ProductService: Using local fallback products");
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    }
  }
}
