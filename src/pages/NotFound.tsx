
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-super-dark p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold crypto-text-gradient mb-6">404</h1>
        <p className="text-2xl text-white mb-6">Oops! Page not found</p>
        <p className="text-white/70 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Button className="crypto-gradient" asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
