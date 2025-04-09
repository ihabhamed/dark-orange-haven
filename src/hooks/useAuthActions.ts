
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { AuthResult } from '@/types/auth';

/**
 * Hook to provide authentication actions
 */
export const useAuthActions = (setIsLoading: (value: boolean) => void) => {
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
      
     // ✅ Reload to fix context issues
      setTimeout(() => {
        window.location.assign("/admin");
      }, 300);


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

  const signOut = async (): Promise<void> => {
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

  return {
    signIn,
    signUp,
    signOut
  };
};
