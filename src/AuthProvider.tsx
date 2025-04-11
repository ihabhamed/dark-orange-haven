
import React, { createContext, useContext, useState } from 'react';

// Simplified AuthContext type without backend dependencies
interface AuthContextType {
  user: null;
  session: null;
  isAdmin: boolean;
  isLoading: boolean;
  authChecked: boolean;
  signIn: () => Promise<{error: null}>;
  signUp: () => Promise<{error: null}>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock auth functions for frontend-only mode
  const signIn = async () => {
    console.log('Mock sign in - no backend connection');
    return { error: null };
  };

  const signUp = async () => {
    console.log('Mock sign up - no backend connection');
    return { error: null };
  };

  const signOut = async () => {
    console.log('Mock sign out - no backend connection');
  };

  // Provide mock values for the auth context
  const authContextValue: AuthContextType = {
    user: null,
    session: null,
    isAdmin: true, // Set to true to access admin features without backend
    isLoading: false,
    authChecked: true,
    signIn,
    signUp,
    signOut,
  };

  console.log('🧠 Mock AuthProvider - No backend connection');

  return (
    <AuthContext.Provider value={authContextValue}>
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
