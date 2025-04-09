
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, ListChecks, FileText, MessageSquare, Settings } from 'lucide-react';
import AdminNavItem from './AdminNavItem';
import LogoutButton from './LogoutButton';

const navigation = [
  { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
  { name: 'الخدمات', href: '/admin/services', icon: ListChecks },
  { name: 'المدونة', href: '/admin/blog', icon: FileText },
  { name: 'طلبات الاستشارات', href: '/admin/requests', icon: MessageSquare },
  { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
];

interface AdminNavProps {
  setMobileMenuOpen?: (open: boolean) => void;
}

const AdminNav: React.FC<AdminNavProps> = ({ setMobileMenuOpen }) => {
  const handleNavItemClick = () => {
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4">
        <h2 className="text-xl font-bold crypto-text-gradient">لوحة التحكم</h2>
      </div>
      <Separator className="bg-white/5" />
      <ScrollArea className="flex-1 py-2">
        <div className="space-y-1 px-2">
          {navigation.map((item) => (
            <div key={item.name} onClick={handleNavItemClick}>
              <AdminNavItem
                href={item.href}
                icon={item.icon}
                name={item.name}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator className="bg-white/5" />
      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default AdminNav;
