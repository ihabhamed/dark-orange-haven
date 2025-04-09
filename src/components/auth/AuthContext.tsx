
import React, { createContext, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthContextType } from '@/types/auth';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useAuthStateChange } from '@/hooks/useAuthStateChange';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, 
    session, 
    isAdmin, 
    isLoading, 
    setIsLoading, 
    handleAuthChange 
  } = useAuthStateChange();
  
  const { signIn, signUp, signOut } = useAuthActions(setIsLoading);

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
