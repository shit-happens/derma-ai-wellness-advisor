
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full derma-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">DA</span>
            </div>
            <span className="font-bold text-xl md:text-2xl text-foreground">DermaAI</span>
          </Link>
          <nav className="flex items-center space-x-6">
            {location.pathname !== '/' && (
              <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition">
                Home
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 DermaAI. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
