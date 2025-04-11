
// Mock auth state change hook for frontend-only mode
import { useState, useCallback } from 'react';

export const useAuthStateChange = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // Always admin in frontend-only mode
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(true);

  console.log("🔥 useAuthStateChange.ts loaded in frontend-only mode ✅");

  const handleAuthChange = useCallback(async () => {
    console.log("🔥 Mock handleAuthChange - no backend connection");
    // Always set authChecked to true in frontend-only mode
    setAuthChecked(true);
    setIsLoading(false);
    return;
  }, []);

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
