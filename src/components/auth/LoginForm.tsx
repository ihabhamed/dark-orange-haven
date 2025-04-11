
import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginFormFields } from './LoginFormFields';
import { SignupFormFields } from './SignupFormFields';

const LoginForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('Login form is rendered');

  return (
    <Card className="w-full glass-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold crypto-text-gradient">تسجيل الدخول</CardTitle>
        <CardDescription>
          قم بتسجيل الدخول أو إنشاء حساب جديد
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginFormFields
              email={loginEmail}
              setEmail={setLoginEmail}
              password={loginPassword}
              setPassword={setLoginPassword}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </TabsContent>
          <TabsContent value="signup">
            <SignupFormFields
              email={signupEmail}
              setEmail={setSignupEmail}
              password={signupPassword}
              setPassword={setSignupPassword}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
