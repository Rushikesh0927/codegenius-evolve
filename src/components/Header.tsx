
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useFadeIn } from '@/utils/animations';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerFade = useFadeIn(100);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      style={headerFade.style}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-2">
              C
            </div>
            <span className="text-xl font-display font-semibold">CodeGenius</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="font-medium transition-colors hover:text-primary">Features</a>
          <a href="#editor" className="font-medium transition-colors hover:text-primary">Editor</a>
          <a href="#about" className="font-medium transition-colors hover:text-primary">About</a>
          <Link to="/pricing" className="font-medium transition-colors hover:text-primary">Pricing</Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => navigate('/get-started')}
            >
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="rounded-full"
              onClick={() => navigate('/get-started')}
            >
              Get Started
            </Button>
          </div>
        </nav>

        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="mr-2 rounded-full"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="py-2 font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#editor" 
                className="py-2 font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Editor
              </a>
              <a 
                href="#about" 
                className="py-2 font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <Link 
                to="/pricing" 
                className="py-2 font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full rounded-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/get-started');
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="w-full rounded-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/get-started');
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
