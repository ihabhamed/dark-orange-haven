
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, user, isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Monitor auth state
  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      // If user is logged in and is admin, navigate to admin dashboard
      console.log('User logged in and is admin, redirecting to dashboard');
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const result = await signIn(email, password);
      
      if (result.error) {
        console.error('Login error:', result.error);
        toast({
          title: 'خطأ في تسجيل الدخول',
          description: result.error.message || 'فشل تسجيل الدخول، يرجى التحقق من بيانات الاعتماد والمحاولة مرة أخرى.',
          variant: 'destructive',
        });
      }
      // Navigation will be handled by the useEffect monitoring auth state
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

  // If the user is logged in but not admin, show a message
  if (!isLoading && user && !isAdmin) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl crypto-text-gradient">حساب غير مصرح</CardTitle>
          <CardDescription>ليس لديك صلاحيات الوصول للوحة التحكم</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <UserCheck className="h-4 w-4 ml-2" />
            <AlertDescription>
              أنت مسجل الدخول كـ {user.email}، لكن هذا الحساب ليس لديه صلاحيات المسؤول.
              يرجى التواصل مع مسؤول الموقع للحصول على الصلاحيات المناسبة.
            </AlertDescription>
          </Alert>
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => navigate('/')}
          >
            العودة للموقع الرئيسي
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl crypto-text-gradient">الوصول للوحة التحكم</CardTitle>
        <CardDescription>قم بتسجيل الدخول أو إنشاء حساب للوصول إلى لوحة التحكم</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="login" className="w-1/2">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup" className="w-1/2">إنشاء حساب</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
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
          </TabsContent>
          
          <TabsContent value="signup">
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
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          هذه المنطقة مخصصة للمسؤولين فقط
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
