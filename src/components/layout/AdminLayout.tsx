import React, { useState } from 'react';
import { useBranding } from '../../context/BrandingContext';
import { useTheme } from '../../context/ThemeContext';
import { BrandLogo, Button } from '../ui';
import {
  LayoutDashboard, Package, Users, BarChart3, Settings,
  Palette, Calendar, FileText, Menu, X, Sun, Moon,
  LogOut, ChevronLeft, Bell
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
  { label: 'Products', icon: <Package size={20} />, path: '/admin/products' },
  { label: 'Buyers', icon: <Users size={20} />, path: '/admin/buyers' },
  { label: 'Reports', icon: <BarChart3 size={20} />, path: '/admin/reports' },
  { label: 'Dynamic Content', icon: <FileText size={20} />, path: '/admin/content' },
  { label: 'Festival Studio', icon: <Calendar size={20} />, path: '/admin/festivals' },
  { label: 'Design Themes', icon: <Palette size={20} />, path: '/admin/themes' },
  { label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function AdminLayout({ children, currentPath, onNavigate }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { branding } = useBranding();
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-main)]">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col
          bg-[var(--color-bg-sidebar)]
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className={`flex items-center h-[var(--header-height)] px-4 border-b border-white/10 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          {sidebarCollapsed ? (
            <div className="w-9 h-9 rounded-[var(--radius-md)] overflow-hidden flex items-center justify-center bg-[var(--color-primary)]">
              {branding.logoUrl ? (
                <img
                  src={branding.logoUrl}
                  alt={branding.companyName}
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <span className="text-white font-bold text-sm">M</span>
              )}
            </div>
          ) : (
            <BrandLogo
              size="md"
              logoUrl={branding.logoUrl}
              companyName={branding.companyName}
              tagline={branding.tagline}
              className="[&_*]:!text-white [&_p:first-child]:!text-white [&_p:last-child]:!text-white/60"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {adminNavItems.map(item => {
              const isActive = currentPath === item.path ||
                (item.path !== '/admin' && currentPath.startsWith(item.path));
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)]
                      text-sm font-medium transition-all duration-200
                      ${sidebarCollapsed ? 'justify-center' : ''}
                      ${isActive
                        ? 'bg-[var(--color-bg-sidebar-active)] text-[var(--color-text-sidebar-active)]'
                        : 'text-[var(--color-text-sidebar)] hover:bg-[var(--color-bg-sidebar-hover)] hover:text-white'
                      }
                    `}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!sidebarCollapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-[var(--color-primary)] text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-[var(--color-text-sidebar)] hover:bg-[var(--color-bg-sidebar-hover)] hover:text-white transition-colors text-sm"
          >
            <ChevronLeft size={18} className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
          <button
            onClick={() => handleNavClick('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-[var(--color-text-sidebar)] hover:bg-[var(--color-bg-sidebar-hover)] hover:text-white transition-colors text-sm mt-1"
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span>Exit Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-[var(--header-height)] flex items-center justify-between px-4 lg:px-6 bg-[var(--color-bg-card)] border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:block">
              <BrandLogo size="sm" logoUrl={branding.logoUrl} companyName={branding.companyName} tagline="" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-error)]" />
            </button>
            <div className="ml-2 w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
