
import { toast } from '@/hooks/use-toast';

export const useAuthActions = (setIsLoading: (value: boolean) => void) => {
  const signIn = async () => {
    toast({
      title: 'تم تسجيل الدخول (وضع المحاكاة)',
      description: 'هذا نموذج تسجيل دخول بدون خلفية',
    });
    console.log('Mock sign in - no backend connection');
    return { error: null };
  };

  const signUp = async () => {
    toast({
      title: 'تم إنشاء الحساب (وضع المحاكاة)',
      description: 'هذا نموذج إنشاء حساب بدون خلفية',
    });
    console.log('Mock sign up - no backend connection');
    return { error: null };
  };

  const signOut = async () => {
    toast({
      title: 'تم تسجيل الخروج (وضع المحاكاة)',
    });
    console.log('Mock sign out - no backend connection');
  };

  return {
    signIn,
    signUp,
    signOut
  };
};
