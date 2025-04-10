console.log("🔥 useAdminCheck.ts loaded ✅");

import { supabase } from '@/lib/supabase';

/**
 * Hook to check if a user has admin role
 */
export const useAdminCheck = () => {
  const checkUserRole = async (userId: string): Promise<boolean> => {
    try {
      console.log("🟡 Running checkUserRole for user:", userId);

      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle(); // منع كسر الدالة لو مفيش نتيجة

      console.log("📦 Role fetched:", userRoles);
      console.log("❌ Role fetch error:", rolesError);

      if (rolesError && rolesError.code !== 'PGRST116') {
        console.error('🔴 Error fetching user role:', rolesError);
        return false;
      }

      return userRoles?.role === 'admin';
    } catch (error) {
      console.error("🔥 checkUserRole failed with error:", error);
      return false;
    }
  };

  return { checkUserRole };
};
