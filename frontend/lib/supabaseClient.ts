import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uiiftayelwraxowjisub.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_w5luDfjyBKmJtlnFVWVc0g_tNXFJz_X';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
