
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const SUPABASE_URL = "https://cewubqlbugfypzoekodd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNld3VicWxidWdmeXB6b2Vrb2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzkzMDUsImV4cCI6MjA1OTc1NTMwNX0.NfTbcXsS79Rrsq0IhT6l4-0xFzV_nHXlwepMMjq-c1c";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
