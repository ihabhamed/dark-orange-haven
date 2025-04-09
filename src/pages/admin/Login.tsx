import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const { isAdmin, isLoading, user } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Set a flag when auth check is complete
    if (!isLoading) {
      setAuthChecked(true);
    }
  }, [isLoading]);

  // Show loading spinner only while actively checking auth
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  // Redirect to admin dashboard if user is already logged in and is admin
  if (authChecked && user && isAdmin) {
    console.log('User is already logged in and is admin, redirecting');
    return <Navigate to="/admin" replace />;
  }

  // Otherwise, show the login form
  return (
    <div className="flex min-h-screen flex-col bg-crypto-dark">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold crypto-text-gradient mb-2">لوحة الإدارة</h1>
            <p className="text-white/70">قم بتسجيل الدخول للوصول إلى لوحة تحكم الموقع</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
