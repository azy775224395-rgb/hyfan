
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

const createSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase URL or Anon Key is missing. Check your environment variables.');
    return null;
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

export const supabase = createSupabaseClient();
