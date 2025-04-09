import { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAdminCheck } from './useAdminCheck';

/**
 * Hook to handle authentication state changes
 */
export const useAuthStateChange = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  
  const adminCheckResult = useAdminCheck(); // ✅ استدعاء hook
  const { checkUserRole } = adminCheckResult;

  // ✅ اختبار الدالة راجعة ولا لا
  console.log("🔄 useAdminCheck() returned:", adminCheckResult);
  console.log("🔧 checkUserRole function is:", checkUserRole);

  // ✅ Function runs on auth state change (e.g. sign in)
  const handleAuthChange = useCallback(async (currentSession: Session | null) => {
    console.log('⚡ handleAuthChange triggered with session:', currentSession ? 'exists' : 'null');
    setSession(currentSession);
    
    if (currentSession?.user) {
      setUser(currentSession.user);

      console.log("⚡ About to run checkUserRole...");

      // ✅ Checking admin role using user_id – no try/catch to expose all errors
      const isUserAdmin = await checkUserRole(currentSession.user.id);
      console.log('🔍 Admin Check → User ID:', currentSession.user.id);
      console.log('🧠 Admin Check → Returned:', isUserAdmin);

      setIsAdmin(isUserAdmin);
    } else {
      console.log("❌ No session or user found – clearing state");
      setUser(null);
      setIsAdmin(false);
    }

    // ✅ Mark auth check complete
    setAuthChecked(true);
    setIsLoading(false);
  }, [checkUserRole]);

  // 🐞 Debug logs to follow auth state changes
  useEffect(() => {
    console.log("🧾 Auth context state:", {
      isLoading,
      user: !!user,
      isAdmin,
      authChecked,
      session: !!session,
    });
  }, [isLoading, user, isAdmin, authChecked, session]);

  return {
    user,
    session,
    isAdmin,
    isLoading,
    authChecked,
    setIsLoading,
    handleAuthChange,
    setUser,
    setSession,
    setIsAdmin
  };
};
