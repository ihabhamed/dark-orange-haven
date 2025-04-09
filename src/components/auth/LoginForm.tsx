
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { NonAdminMessage } from './NonAdminMessage';
import { LoginFormFields } from './LoginFormFields';
import { SignupFormFields } from './SignupFormFields';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  // Monitor auth state
  useEffect(() => {
    // Only redirect when loading is complete AND user is admin
    if (!isLoading && user && isAdmin) {
      console.log('User logged in and is admin, redirecting to dashboard');
      // Use a small timeout to ensure all state updates have propagated
      setTimeout(() => {
        navigate('/admin', { replace: true });
      }, 100);
    }
  }, [user, isAdmin, isLoading, navigate]);

  // If the user is logged in but not admin, show a message
  if (!isLoading && user && !isAdmin) {
    return <NonAdminMessage email={user.email} />;
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
            <LoginFormFields 
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupFormFields 
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
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
