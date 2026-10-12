import React, { useState } from 'react';
import { useBranding } from '../../context/BrandingContext';
import { useTheme } from '../../context/ThemeContext';
import { BrandLogo, Button } from '../ui';
import { Menu, X, ShoppingCart, Search, User, Sun, Moon, Heart } from 'lucide-react';

interface BuyerLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const buyerNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Products', path: '/products' },
  { label: 'Festivals', path: '/festivals' },
  { label: 'About', path: '/about' },
];

export function BuyerLayout({ children, currentPath, onNavigate }: BuyerLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { branding } = useBranding();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] shadow-[var(--shadow-sm)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => onNavigate('/')} className="flex-shrink-0">
              <BrandLogo
                size="md"
                logoUrl={branding.logoUrl}
                companyName={branding.companyName}
                tagline={branding.tagline}
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {buyerNavItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`
                    px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200
                    ${currentPath === item.path
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-main)]'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors">
                <Search size={18} />
              </button>
              <button className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors">
                <Heart size={18} />
              </button>
              <button className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors relative">
                <ShoppingCart size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-medium">
                  3
                </span>
              </button>
              <button className="hidden sm:flex items-center gap-2 ml-2 px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors">
                <User size={16} />
                <span>Account</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-card)] animate-fade-in">
            <nav className="px-4 py-3 space-y-1">
              {buyerNavItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => { onNavigate(item.path); setMobileMenuOpen(false); }}
                  className={`
                    w-full text-left px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-all
                    ${currentPath === item.path
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-main)]'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { onNavigate('/admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-bg-main)] transition-all mt-2 border-t border-[var(--color-border)] pt-3"
              >
                Admin Panel →
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--color-bg-sidebar)] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <BrandLogo
                size="md"
                logoUrl={branding.logoUrl}
                companyName={branding.companyName}
                tagline={branding.tagline}
                className="[&_*]:!text-white [&_p:first-child]:!text-white [&_p:last-child]:!text-white/60"
              />
              <p className="mt-4 text-sm text-white/60">
                Handcrafted fabric art celebrating Indian heritage and contemporary design.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Shop</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button className="hover:text-white transition-colors">New Arrivals</button></li>
                <li><button className="hover:text-white transition-colors">Best Sellers</button></li>
                <li><button className="hover:text-white transition-colors">Collections</button></li>
                <li><button className="hover:text-white transition-colors">Sale</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Our Artisans</button></li>
                <li><button className="hover:text-white transition-colors">Sustainability</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button className="hover:text-white transition-colors">FAQ</button></li>
                <li><button className="hover:text-white transition-colors">Shipping</button></li>
                <li><button className="hover:text-white transition-colors">Returns</button></li>
                <li><button className="hover:text-white transition-colors">Size Guide</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © 2024 {branding.companyName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.998-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
              <button className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
