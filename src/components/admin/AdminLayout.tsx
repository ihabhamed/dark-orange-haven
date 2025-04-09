
import React, { useState } from 'react';
import AdminAuthGuard from './auth/AdminAuthGuard';
import MobileSidebar from './navigation/MobileSidebar';
import AdminNav from './navigation/AdminNav';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <AdminAuthGuard>
      <div className="relative h-full min-h-screen bg-crypto-dark/30">
        {/* Mobile sidebar */}
        <MobileSidebar open={open} setOpen={setOpen} />

        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 right-0 z-10 hidden w-64 border-l border-white/10 bg-crypto-super-dark md:block">
          <AdminNav />
        </aside>

        {/* Main content */}
        <main className="min-h-screen pt-16 md:pr-64">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
};

export default AdminLayout;
