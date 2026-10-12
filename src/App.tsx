import React, { useState } from 'react';
import { BrandingProvider } from './context/BrandingContext';
import { ThemeProvider } from './context/ThemeContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { BuyerLayout } from './components/layout/BuyerLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminBuyers } from './pages/admin/Buyers';
import { AdminReports } from './pages/admin/Reports';
import { AdminSettings } from './pages/admin/Settings';
import { AdminContent, AdminFestivals, AdminThemes } from './pages/admin/ContentPages';
import { BuyerHome, BuyerProducts, BuyerCollections, BuyerFestivals, BuyerAbout } from './pages/buyer/BuyerPages';

function AppContent() {
  const [currentPath, setCurrentPath] = useState('/');

  const isAdmin = currentPath.startsWith('/admin');

  const renderPage = () => {
    switch (currentPath) {
      // Admin pages
      case '/admin':
        return <AdminDashboard />;
      case '/admin/products':
        return <AdminProducts />;
      case '/admin/buyers':
        return <AdminBuyers />;
      case '/admin/reports':
        return <AdminReports />;
      case '/admin/settings':
        return <AdminSettings />;
      case '/admin/content':
        return <AdminContent />;
      case '/admin/festivals':
        return <AdminFestivals />;
      case '/admin/themes':
        return <AdminThemes />;
      // Buyer pages
      case '/':
        return <BuyerHome onNavigate={setCurrentPath} />;
      case '/products':
        return <BuyerProducts />;
      case '/collections':
        return <BuyerCollections />;
      case '/festivals':
        return <BuyerFestivals />;
      case '/about':
        return <BuyerAbout />;
      default:
        return <BuyerHome onNavigate={setCurrentPath} />;
    }
  };

  if (isAdmin) {
    return (
      <AdminLayout currentPath={currentPath} onNavigate={setCurrentPath}>
        {renderPage()}
      </AdminLayout>
    );
  }

  return (
    <BuyerLayout currentPath={currentPath} onNavigate={setCurrentPath}>
      {renderPage()}
    </BuyerLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrandingProvider>
        <AppContent />
      </BrandingProvider>
    </ThemeProvider>
  );
}
