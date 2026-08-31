import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://mcodgohyioacpncndfpu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_bdUee54Kq-1camX09UR2KA_bWvj859f";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);