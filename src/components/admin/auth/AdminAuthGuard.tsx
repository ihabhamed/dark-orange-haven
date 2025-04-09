
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const { isAdmin, isLoading, user, signOut } = useAuth();
  const [authReady, setAuthReady] = React.useState(false);

  // Use an effect to determine when auth is ready
  React.useEffect(() => {
    if (!isLoading) {
      // Auth state has loaded, now we can make decisions
      setAuthReady(true);
    }
  }, [isLoading]);

  // Only show loading state when auth is still loading
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-crypto-dark">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  // Auth is ready but no user is logged in
  if (authReady && !user) {
    console.log('Auth ready but no user, redirecting to login');
    return <Navigate to="/admin/login" />;
  }

  // User is logged in but not admin
  if (authReady && user && !isAdmin) {
    console.log('Auth ready, user is logged in but not admin');
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-crypto-dark p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>غير مصرح</AlertTitle>
          <AlertDescription>
            أنت مسجل الدخول لكن لا تملك صلاحيات المسؤول. 
            يرجى التواصل مع مسؤول الموقع للحصول على الصلاحيات.
          </AlertDescription>
        </Alert>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={signOut}
        >
          تسجيل الخروج
        </Button>
      </div>
    );
  }

  // User is logged in and is admin - can show admin layout
  return <>{children}</>;
};

export default AdminAuthGuard;
