// ✅ useAdminCheck.ts

import { supabase } from '@/lib/supabase';

console.log("🔥 useAdminCheck.ts loaded ✅");

export const useAdminCheck = () => {
  const checkUserRole = async (userId: string): Promise<boolean> => {
    console.log("🟡 Running checkUserRole for user:", userId);

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      console.log("📦 Supabase response → data:", data);
      console.log("⚠️ Supabase response → error:", error);

      if (!data && !error) {
        console.warn("⚠️ No data and no error — check your RLS policy?");
        return false;
      }

      if (error) {
        console.error("🚫 Error fetching role:", error.message);
        return false;
      }

      const isAdmin = data.role === 'admin';
      console.log("✅ Final result → isAdmin:", isAdmin);

      return isAdmin;
    } catch (err) {
      console.error("🔥 Unexpected error in checkUserRole:", err);
      return false;
    }
  };

  return { checkUserRole };
};
