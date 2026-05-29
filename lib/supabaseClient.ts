
import { createClient } from '@supabase/supabase-js';

let url = import.meta.env.VITE_SUPABASE_URL || '';
let key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Handle accidental swap
if (!url.startsWith('http') && key.startsWith('http')) {
  const temp = url;
  url = key;
  key = temp;
}

const SUPABASE_URL = url;
const SUPABASE_ANON_KEY = key;

const createSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase URL or Anon Key is missing. Check your environment variables.');
    return null;
  }

  if (!SUPABASE_URL.startsWith('http://') && !SUPABASE_URL.startsWith('https://')) {
    console.error('Supabase URL must be a valid HTTP/HTTPS URL, but got:', SUPABASE_URL);
    return null;
  }

  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
};

export const supabase = createSupabaseClient();
