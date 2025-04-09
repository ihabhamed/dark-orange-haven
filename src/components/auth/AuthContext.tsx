
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthContextType } from '@/types/auth';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { useAuthActions } from '@/hooks/useAuthActions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { checkUserRole } = useAdminCheck();
  const { signIn, signUp, signOut } = useAuthActions(setIsLoading);

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

  useEffect(() => {
    console.log('Auth provider initializing');
    setIsLoading(true);
    
    // Set up auth state change listener first
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);
        await handleAuthChange(currentSession);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession ? 'Session exists' : 'No session');
      await handleAuthChange(currentSession);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
