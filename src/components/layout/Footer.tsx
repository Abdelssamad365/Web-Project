import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const FOOTER_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Packages', path: '/packages' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const;

const LEGAL_LINKS = [
  { label: 'Terms', path: '/terms' },
  { label: 'Privacy', path: '/privacy' },
] as const;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8" role="contentinfo">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">WanderLuxe</h2>
            <p className="text-gray-300 mt-2">
              Discover the world's most amazing destinations with our premium travel packages.
            </p>
          </div>
          
          <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8" aria-label="Footer navigation">
            {FOOTER_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} WanderLuxe Travel Agency. All rights reserved.
          </p>
          <nav className="flex space-x-6" aria-label="Legal links">
            {LEGAL_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
