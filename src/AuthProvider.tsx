import React, { createContext, useContext, useEffect } from 'react';
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
    authChecked,
    setIsLoading,
    handleAuthChange,
  } = useAuthStateChange();

  const { signIn, signUp, signOut } = useAuthActions(setIsLoading);

  useEffect(() => {
    console.log('🧠 AuthProvider initializing...');
    setIsLoading(true);

    // 📌 Subscribe to Supabase auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event);
        await handleAuthChange(session);
      }
    );

    // 📌 Run initial session check on mount
    supabase.auth.getSession()
      .then(async ({ data: { session } }) => {
        console.log("📦 Initial session:", session);
        await handleAuthChange(session);
      })
      .catch((err) => {
        console.error("❌ Error fetching session:", err);
      });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [handleAuthChange]);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAdmin,
      isLoading,
      authChecked,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
