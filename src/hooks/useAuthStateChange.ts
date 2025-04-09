
import { useState } from 'react';
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
  
  const { checkUserRole } = useAdminCheck();

  // Function to handle auth state change
  const handleAuthChange = async (currentSession: Session | null) => {
    setSession(currentSession);
    
    if (currentSession?.user) {
      setUser(currentSession.user);
      
      // Check if user is admin after setting the user
      const isUserAdmin = await checkUserRole(currentSession.user.id);
      console.log('User admin status:', isUserAdmin);
      setIsAdmin(isUserAdmin);
    } else {
      setUser(null);
      setIsAdmin(false);
    }
    
    setIsLoading(false);
  };

  return {
    user,
    session,
    isAdmin,
    isLoading,
    setIsLoading,
    handleAuthChange,
    setUser,
    setSession,
    setIsAdmin
  };
};
