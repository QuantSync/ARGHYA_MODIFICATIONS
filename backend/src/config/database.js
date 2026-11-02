const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://uiiftayelwraxowjisub.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || 'sb_secret_MmIstWl3vrZKUpimPbwhUg_7I8Tr0mG';

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase Config Warning] SUPABASE_URL or SUPABASE_KEY missing.');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

module.exports = supabase;
