
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface AuthResult {
  error?: {
    message: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check if user is admin
  const checkUserRole = async (userId: string) => {
    try {
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      if (rolesError && rolesError.code !== 'PGRST116') {
        console.error('Error fetching user role:', rolesError);
        return false;
      }
      
      return !!userRoles;
    } catch (error) {
      console.error('Error in checkUserRole:', error);
      return false;
    }
  };

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

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      console.log('Signing in user:', email);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: 'خطأ في تسجيل الدخول',
          description: error.message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return { error };
      }
      
      // Session will be handled by the onAuthStateChange listener
      console.log('Sign in successful');
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحبًا بك في لوحة التحكم',
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Error signing in:', error);
      setIsLoading(false);
      return { error: { message: error.message || 'حدث خطأ غير متوقع' } };
    }
  };

  const signUp = async (email: string, password: string): Promise<AuthResult> => {
    try {
      console.log('Signing up user:', email);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: 'خطأ في إنشاء الحساب',
          description: error.message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return { error };
      }
      
      // Session will be handled by the onAuthStateChange listener if email confirmation is disabled
      console.log('Sign up successful');
      toast({
        title: 'تم إنشاء الحساب بنجاح',
        description: 'تم إرسال رابط التأكيد إلى بريدك الإلكتروني',
      });
      
      setIsLoading(false);
      return { error: null };
    } catch (error: any) {
      console.error('Error signing up:', error);
      setIsLoading(false);
      return { error: { message: error.message || 'حدث خطأ غير متوقع' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: 'خطأ في تسجيل الخروج',
          description: error.message,
          variant: 'destructive',
        });
        setIsLoading(false);
        throw error;
      }
      
      // Session will be handled by the onAuthStateChange listener
      console.log('Sign out successful');
      toast({
        title: 'تم تسجيل الخروج بنجاح',
      });
      
      return;
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoading(false);
      throw error;
    }
  };

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
