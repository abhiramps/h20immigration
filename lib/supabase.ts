import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Provide fallback values to prevent build errors when env vars are missing
// The client will still fail at runtime if specific operations are attempted without valid creds
const url = supabaseUrl || 'https://example.supabase.co';
const key = supabaseKey || 'example-key';

if (!supabaseUrl || !supabaseKey) {
  if (typeof window !== 'undefined' || process.env.NODE_ENV === 'development') {
    console.warn(
      'Supabase URL or Key is missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.'
    );
  }
}

export const supabase = createClient(url, key);