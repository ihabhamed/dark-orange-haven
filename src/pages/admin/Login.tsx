import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const { isAdmin, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Set a flag when auth check is complete
    if (!isLoading) {
      setAuthChecked(true);
      
      // If user is admin, redirect to admin dashboard
      if (isAdmin) {
        console.log('User is admin, redirecting to admin dashboard');
        navigate('/admin', { replace: true });
      }
    }
  }, [isLoading, isAdmin, navigate]);

  // Show loading spinner while auth is being checked
  if (isLoading || !authChecked) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  // If user is admin, they will be redirected by the useEffect above
  // If they're logged in but not admin, show error message in LoginForm
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
