
import React from 'react';
import { useAuth } from './AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SignupFormFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const SignupFormFields: React.FC<SignupFormFieldsProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isSubmitting,
  setIsSubmitting
}) => {
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'بيانات ناقصة',
        description: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.',
        variant: 'destructive',
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: 'كلمة المرور قصيرة',
        description: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      const result = await signUp(email, password);
      
      if (result.error) {
        console.error('Signup error:', result.error);
        toast({
          title: 'خطأ في إنشاء الحساب',
          description: result.error.message || 'فشل إنشاء الحساب، يرجى المحاولة مرة أخرى.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'تم إنشاء الحساب بنجاح',
          description: 'تم إنشاء حسابك بنجاح، يمكنك الآن تسجيل الدخول.',
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'خطأ في إنشاء الحساب',
        description: 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-signup">البريد الإلكتروني</Label>
        <Input
          id="email-signup"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-signup">كلمة المرور</Label>
        <Input
          id="password-signup"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <Button type="submit" className="w-full crypto-gradient" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            جاري إنشاء الحساب...
          </>
        ) : (
          'إنشاء حساب'
        )}
      </Button>
    </form>
  );
};
