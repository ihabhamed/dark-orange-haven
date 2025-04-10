console.log("🔥 useAdminCheck.ts loaded ✅");

import { supabase } from '@/lib/supabase';

/**
 * Hook to check if a user has admin role
 */
export const useAdminCheck = () => {
  const checkUserRole = async (userId: string): Promise<boolean> => {
    console.log("🟡 Running checkUserRole for user:", userId);

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      console.log("📦 Supabase response → data:", data);
      console.log("⚠️ Supabase response → error:", error);

      if (error && error.code !== 'PGRST116') {
        console.error("🚫 Error fetching role:", error.message);
        return false;
      }

      const isAdmin = data?.role === 'admin';
      console.log("✅ Final result → isAdmin:", isAdmin);

      return isAdmin;
    } catch (err) {
      console.error("🔥 Unexpected error in checkUserRole:", err);
      return false;
    }
  };

  return { checkUserRole };
};
