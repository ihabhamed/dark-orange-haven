import { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
// بدل الاستيراد المباشر هنطبع الموديول كله
import * as adminModule from './useAdminCheck';

console.log("🔥 useAuthStateChange.ts loaded ✅"); // ← تأكيد تحميل الملف
console.log("✅ adminModule content:", adminModule); // ← اختبار الملف التاني

export const useAuthStateChange = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const { checkUserRole } = adminModule;

  console.log("🔧 checkUserRole function type:", typeof checkUserRole);

  const handleAuthChange = useCallback(async (currentSession: Session | null) => {
    console.log('⚡ handleAuthChange triggered with session:', currentSession ? 'exists' : 'null');
    setSession(currentSession);

    if (currentSession?.user) {
      console.log("👤 Setting user:", currentSession.user.email);
      setUser(currentSession.user);

      console.log("⚡ Running checkUserRole...");
      const isUserAdmin = await checkUserRole(currentSession.user.id);
      console.log('🧠 Admin Check → Result:', isUserAdmin);

      setIsAdmin(isUserAdmin);
    } else {
      console.log("❌ No session or user found – clearing state");
      setUser(null);
      setIsAdmin(false);
    }

    setAuthChecked(true);
    setIsLoading(false);
  }, [checkUserRole]);

  useEffect(() => {
    console.log("🧾 Auth context updated:", {
      isLoading,
      user,
      isAdmin,
      authChecked,
      session,
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
    setIsAdmin,
  };
};
