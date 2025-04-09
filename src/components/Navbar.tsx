
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bitcoin } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-crypto-super-dark/80 border-b border-white/10">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Bitcoin className="h-8 w-8 text-crypto" />
          <span className="text-xl font-bold crypto-text-gradient">CryptoExpert</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white/80 hover:text-crypto transition-colors">الرئيسية</Link>
          <Link to="/services" className="text-white/80 hover:text-crypto transition-colors">الخدمات</Link>
          <Link to="/consulting" className="text-white/80 hover:text-crypto transition-colors">الاستشارات</Link>
          <Link to="/about" className="text-white/80 hover:text-crypto transition-colors">من أنا</Link>
          <Link to="/blog" className="text-white/80 hover:text-crypto transition-colors">المدونة</Link>
          <Link to="/contact" className="text-white/80 hover:text-crypto transition-colors">تواصل معنا</Link>
          <Button className="crypto-gradient">احجز جلسة</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-crypto-super-dark animate-fade-in z-40">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className="text-white/80 hover:text-crypto transition-colors py-3 px-4 border-b border-white/10"
              onClick={toggleMenu}
            >
              الرئيسية
            </Link>
            <Link 
              to="/services" 
              className="text-white/80 hover:text-crypto transition-colors py-3 px-4 border-b border-white/10"
              onClick={toggleMenu}
            >
              الخدمات
            </Link>
            <Link 
              to="/consulting" 
              className="text-white/80 hover:text-crypto transition-colors py-3 px-4 border-b border-white/10"
              onClick={toggleMenu}
            >
              الاستشارات
            </Link>
            <Link 
              to="/about" 
              className="text-white/80 hover:text-crypto transition-colors py-3 px-4 border-b border-white/10"
              onClick={toggleMenu}
            >
              من أنا
            </Link>
            <Link 
              to="/blog" 
              className="text-white/80 hover:text-crypto transition-colors py-3 px-4 border-b border-white/10"
              onClick={toggleMenu}
            >
              المدونة
            </Link>
            <Link 
              to="/contact" 
              className="text-white/80 hover:text-crypto transition-colors py-3 px-4 border-b border-white/10"
              onClick={toggleMenu}
            >
              تواصل معنا
            </Link>
            <div className="pt-4">
              <Button className="crypto-gradient w-full">احجز جلسة</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
