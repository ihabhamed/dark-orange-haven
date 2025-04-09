
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface AdminNavItemProps {
  href: string;
  icon: LucideIcon;
  name: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({ href, icon: Icon, name }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-crypto-super-dark text-crypto'
          : 'text-muted-foreground hover:bg-crypto-super-dark/70 hover:text-white'
      }`}
    >
      <Icon className="ml-2 h-5 w-5" />
      {name}
    </Link>
  );
};

export default AdminNavItem;
