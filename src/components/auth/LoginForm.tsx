
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
import { Skeleton } from '@/components/ui/skeleton';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAdmin, isLoading, authChecked } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Debug log
  console.log('LoginForm render state:', { isLoading, authChecked, user: !!user, isAdmin });

  // Monitor auth state for redirection
useEffect(() => {
  if (!isLoading && user !== undefined && isAdmin !== undefined) {
    if (user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }
}, [user, isAdmin, isLoading, navigate]);

  // Show appropriate UI based on auth state
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </CardFooter>
      </Card>
    );
  }

  // If the user is logged in but not admin, show a message
  if (authChecked && user && !isAdmin) {
    console.log('User is logged in but not admin, showing non-admin message');
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
