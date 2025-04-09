
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AdminNav from './AdminNav';

interface MobileSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, setOpen }) => {
  return (
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
        <AdminNav setMobileMenuOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
