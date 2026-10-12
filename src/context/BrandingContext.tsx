import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CompanyBranding {
  companyName: string;
  tagline: string;
  logoUrl: string | null;
  primaryColor: string;
  accentColor: string;
  faviconUrl: string | null;
}

interface BrandingContextType {
  branding: CompanyBranding;
  updateBranding: (updates: Partial<CompanyBranding>) => void;
  isLoading: boolean;
  error: string | null;
  refreshBranding: () => Promise<void>;
}

const defaultBranding: CompanyBranding = {
  companyName: 'Mimiko Studio',
  tagline: 'Fabric Art',
  logoUrl: 'https://image.qwenlm.ai/generated-images/9ebc8b6e-fa10-477f-8664-457c53f64db7/_result.png',
  primaryColor: '#8B1E3F',
  accentColor: '#C49A45',
  faviconUrl: null,
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

// Simulated Supabase branding data store
// In production, this would use the actual Supabase client
const BRANDING_STORAGE_KEY = 'mimiko_branding';

function loadBrandingFromStorage(): CompanyBranding {
  try {
    const stored = localStorage.getItem(BRANDING_STORAGE_KEY);
    if (stored) {
      return { ...defaultBranding, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load branding from storage:', e);
  }
  return defaultBranding;
}

function saveBrandingToStorage(branding: CompanyBranding): void {
  try {
    localStorage.setItem(BRANDING_STORAGE_KEY, JSON.stringify(branding));
  } catch (e) {
    console.warn('Failed to save branding to storage:', e);
  }
}

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<CompanyBranding>(defaultBranding);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshBranding = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate async fetch from Supabase
      await new Promise(resolve => setTimeout(resolve, 300));
      const loaded = loadBrandingFromStorage();
      setBranding(loaded);
    } catch (e) {
      setError('Failed to load company branding');
      setBranding(defaultBranding);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshBranding();
  }, [refreshBranding]);

  const updateBranding = useCallback((updates: Partial<CompanyBranding>) => {
    setBranding(prev => {
      const updated = { ...prev, ...updates };
      saveBrandingToStorage(updated);
      return updated;
    });
  }, []);

  return (
    <BrandingContext.Provider value={{ branding, updateBranding, isLoading, error, refreshBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding(): BrandingContextType {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
}
