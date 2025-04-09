import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const result = await signIn(email, password);
      
      if (result.error) {
        console.error('Login error:', result.error);
        toast({
          title: 'خطأ في تسجيل الدخول',
          description: result.error.message || 'فشل تسجيل الدخول، يرجى التحقق من بيانات الاعتماد والمحاولة مرة أخرى.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'تم تسجيل الدخول بنجاح',
          description: 'مرحباً بك في لوحة التحكم',
        });
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'خطأ في تسجيل الدخول',
        description: 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

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
                />
              </div>
              <Button type="submit" className="w-full crypto-gradient" disabled={isLoading}>
                {isLoading ? (
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
                />
              </div>
              <Button type="submit" className="w-full crypto-gradient" disabled={isLoading}>
                {isLoading ? (
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
