
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dmkyurpyqhqwoczmdpeb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rjAq009RyqMZ7k1h7TfWDw_T9Xu10zb';

const createSupabaseClient = () => {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// Singleton pattern: reuse the instance if it exists
export const supabase = (globalThis as any).supabase ?? createSupabaseClient();

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).supabase = supabase;
}
