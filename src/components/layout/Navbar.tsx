import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useProfile';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Packages', path: '/packages' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-ocean-dark text-2xl font-bold font-heading">WanderLuxe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {NAV_ITEMS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-foreground hover:text-ocean font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-ocean hover:text-ocean-dark font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User size={18} aria-hidden="true" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2"
                  onClick={handleSignOut}
                >
                  <LogOut size={18} aria-hidden="true" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" className="font-medium">Log In</Button>
                </Link>
                <Link to="/auth/register">
                  <Button className="bg-ocean hover:bg-ocean-dark text-white font-medium">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          )}
          aria-hidden={!isMenuOpen}
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
            {NAV_ITEMS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-foreground hover:text-ocean font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-ocean hover:text-ocean-dark font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
          <div className="mt-4 flex flex-col space-y-2">
            {user ? (
              <>
                <Link to="/dashboard" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                    <User size={18} aria-hidden="true" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center space-x-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                >
                  <LogOut size={18} aria-hidden="true" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full font-medium">Log In</Button>
                </Link>
                <Link to="/auth/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-ocean hover:bg-ocean-dark text-white font-medium">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
