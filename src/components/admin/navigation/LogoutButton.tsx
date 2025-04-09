
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();
  
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
      onClick={signOut}
    >
      <LogOut className="ml-2 h-5 w-5" />
      تسجيل الخروج
    </Button>
  );
};

export default LogoutButton;
