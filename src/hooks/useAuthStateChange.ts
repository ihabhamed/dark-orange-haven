
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
  
  const { checkUserRole } = useAdminCheck();

  // Memoized function to handle auth state change
  const handleAuthChange = useCallback(async (currentSession: Session | null) => {
    console.log('Auth state change handler called with session:', currentSession ? 'exists' : 'null');
    setSession(currentSession);
    
    if (currentSession?.user) {
      setUser(currentSession.user);
      
      try {
        // Check if user is admin after setting the user
        const isUserAdmin = await checkUserRole(currentSession.user.id);
        console.log('🔍 Admin Check → User ID:', currentSession.user.id);
        console.log('🧠 Admin Check → Returned:', isUserAdmin);

        setIsAdmin(isUserAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    } else {
      setUser(null);
      setIsAdmin(false);
    }
    
    // Mark auth check as complete and loading as finished
    setAuthChecked(true);
    setIsLoading(false);
  }, [checkUserRole]);

  // Debug useEffect to log state changes
  useEffect(() => {
    console.log({ isLoading, user, isAdmin, authChecked, session: !!session });
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
