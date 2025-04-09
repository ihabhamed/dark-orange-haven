
import React from 'react';
import { useAuth } from './AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginFormFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isSubmitting,
  setIsSubmitting
}) => {
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Wait for signIn to complete
      const result = await signIn(email, password);
      
      if (result.error) {
        console.error('Login error:', result.error);
        toast({
          title: 'خطأ في تسجيل الدخول',
          description: result.error.message || 'فشل تسجيل الدخول، يرجى التحقق من بيانات الاعتماد والمحاولة مرة أخرى.',
          variant: 'destructive',
        });
      } else {
        // Successful login - will be handled by the useEffect in parent
        toast({
          title: 'تم تسجيل الدخول بنجاح',
          description: 'جاري التحقق من الصلاحيات...',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'خطأ في تسجيل الدخول',
        description: 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-login">البريد الإلكتروني</Label>
        <Input
          id="email-login"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-login">كلمة المرور</Label>
        <Input
          id="password-login"
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
            جاري تسجيل الدخول...
          </>
        ) : (
          'تسجيل الدخول'
        )}
      </Button>
    </form>
  );
};
