// ✅ AuthContext.tsx

import React, { createContext, useContext, useEffect } from 'react';
import { AuthContextType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useAuthStateChange } from '@/hooks/useAuthStateChange';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user,
    session,
    isAdmin,
    isLoading,
    authChecked,
    setIsLoading,
    handleAuthChange
  } = useAuthStateChange();

  const { signIn, signUp, signOut } = useAuthActions(setIsLoading);

  useEffect(() => {
    console.log("🚀 AuthProvider mounted");

    setIsLoading(true);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("🔄 Auth state changed:", event);
        await handleAuthChange(currentSession);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log("📦 Initial session:", currentSession);
      await handleAuthChange(currentSession);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [handleAuthChange, setIsLoading]);

  useEffect(() => {
    console.log("🌍 AuthContext State:", {
      isLoading,
      user,
      isAdmin,
      authChecked,
      session
    });
  }, [isLoading, user, isAdmin, authChecked, session]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        isLoading,
        authChecked,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
