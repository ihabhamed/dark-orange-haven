import React, { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  ListChecks,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  AlertTriangle
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAdmin, isLoading, user, signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  // Add authReady to track when auth checks are complete
  const [authReady, setAuthReady] = useState(false);

  // Use an effect to determine when auth is ready
  useEffect(() => {
    if (!isLoading) {
      // Auth state has loaded, now we can make decisions
      setAuthReady(true);
    }
  }, [isLoading]);

  console.log('AdminLayout - auth state:', { isAdmin, isLoading, authReady, user: !!user });

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
  console.log('Auth ready, user is admin, showing admin layout');

  const navigation = [
    { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
    { name: 'الخدمات', href: '/admin/services', icon: ListChecks },
    { name: 'المدونة', href: '/admin/blog', icon: FileText },
    { name: 'طلبات الاستشارات', href: '/admin/requests', icon: MessageSquare },
    { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="relative h-full min-h-screen bg-crypto-dark/30">
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">فتح القائمة</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-0 bg-crypto-super-dark border-l border-white/10">
          <ScrollArea className="h-full py-6">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center">
                <span className="text-xl font-bold crypto-text-gradient">لوحة التحكم</span>
              </div>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
            <Separator className="my-2 bg-white/5" />
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-crypto-super-dark text-crypto'
                      : 'text-muted-foreground hover:bg-crypto-super-dark/70 hover:text-white'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="ml-2 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
            <Separator className="my-2 bg-white/5" />
            <div className="px-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
              >
                <LogOut className="ml-2 h-5 w-5" />
                تسجيل الخروج
              </Button>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 right-0 z-10 hidden w-64 border-l border-white/10 bg-crypto-super-dark md:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4">
            <h2 className="text-xl font-bold crypto-text-gradient">لوحة التحكم</h2>
          </div>
          <Separator className="bg-white/5" />
          <ScrollArea className="flex-1 py-2">
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-crypto-super-dark text-crypto'
                      : 'text-muted-foreground hover:bg-crypto-super-dark/70 hover:text-white'
                  }`}
                >
                  <item.icon className="ml-2 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </ScrollArea>
          <Separator className="bg-white/5" />
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
              onClick={signOut}
            >
              <LogOut className="ml-2 h-5 w-5" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-h-screen pt-16 md:pr-64">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
