import React, { useState } from 'react';
import { Card, PageHeader, Button, Input, Select, Badge } from '../../components/ui';
import { useBranding } from '../../context/BrandingContext';
import { Upload, Save, Check, Image, Palette, Building2, Globe } from 'lucide-react';

export function AdminSettings() {
  const { branding, updateBranding } = useBranding();
  const [activeTab, setActiveTab] = useState('branding');
  const [companyName, setCompanyName] = useState(branding.companyName);
  const [tagline, setTagline] = useState(branding.tagline);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateBranding({ companyName, tagline });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        updateBranding({ logoUrl: url });
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'branding', label: 'Branding', icon: <Palette size={16} /> },
    { id: 'company', label: 'Company', icon: <Building2 size={16} /> },
    { id: 'general', label: 'General', icon: <Globe size={16} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your company branding, preferences, and configuration."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Settings' },
        ]}
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-[var(--color-border)]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all
              ${activeTab === tab.id
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Branding Tab */}
      {activeTab === 'branding' && (
        <div className="space-y-6 animate-fade-in">
          {/* Logo Section */}
          <Card>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">Company Logo</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Upload your company logo. This will appear in the admin sidebar, buyer website header, and other branded locations.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Current Logo Preview */}
              <div className="w-32 h-32 rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border)] flex items-center justify-center bg-[var(--color-bg-main)] overflow-hidden">
                {branding.logoUrl ? (
                  <img src={branding.logoUrl} alt="Company Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="text-center">
                    <Image size={24} className="mx-auto text-[var(--color-text-muted)] mb-1" />
                    <span className="text-xs text-[var(--color-text-muted)]">No logo</span>
                  </div>
                )}
              </div>
              {/* Upload Controls */}
              <div className="flex-1 space-y-3">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)] text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-main)] cursor-pointer transition-colors">
                  <Upload size={16} />
                  <span>Upload New Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Recommended: PNG or SVG, max 2MB. Logo will be displayed at various sizes.
                </p>
                {branding.logoUrl && (
                  <Button variant="ghost" size="sm" onClick={() => updateBranding({ logoUrl: null })}>
                    Remove Logo
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Company Name & Tagline */}
          <Card>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Mimiko Studio"
              />
              <Input
                label="Tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Fabric Art"
              />
              <Input
                label="Primary Color"
                value={branding.primaryColor}
                onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                type="color"
              />
              <Input
                label="Accent Color"
                value={branding.accentColor}
                onChange={(e) => updateBranding({ accentColor: e.target.value })}
                type="color"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={handleSave} icon={saved ? <Check size={16} /> : <Save size={16} />}>
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
              {saved && <Badge variant="success">Settings updated successfully</Badge>}
            </div>
          </Card>

          {/* Preview */}
          <Card>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Live Preview</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              This is how your branding will appear across the application.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sidebar Preview */}
              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-sidebar)]">
                <p className="text-xs text-white/40 mb-3">Admin Sidebar</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] overflow-hidden flex items-center justify-center bg-[var(--color-primary)]">
                    {branding.logoUrl ? (
                      <img src={branding.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-white font-bold text-sm">M</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{companyName}</p>
                    <p className="text-xs text-white/60">{tagline}</p>
                  </div>
                </div>
              </div>
              {/* Header Preview */}
              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-3">Website Header</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] overflow-hidden flex items-center justify-center bg-[var(--color-primary)]">
                    {branding.logoUrl ? (
                      <img src={branding.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-white font-bold text-sm">M</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">{companyName}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{tagline}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Company Tab */}
      {activeTab === 'company' && (
        <div className="space-y-6 animate-fade-in">
          <Card>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Company Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Legal Name" placeholder="Mimiko Studio Pvt. Ltd." />
              <Input label="Registration Number" placeholder="U74999MH2020PTC123456" />
              <Input label="GST Number" placeholder="27AABCU9603R1ZM" />
              <Input label="PAN Number" placeholder="AABCU9603R" />
              <Input label="Email" type="email" placeholder="contact@mimikostudio.com" />
              <Input label="Phone" type="tel" placeholder="+91 22 1234 5678" />
              <div className="md:col-span-2">
                <Input label="Address" placeholder="123, Fabric Lane, Mumbai, Maharashtra 400001" />
              </div>
            </div>
            <div className="mt-4">
              <Button icon={<Save size={16} />}>Save Company Details</Button>
            </div>
          </Card>
        </div>
      )}

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6 animate-fade-in">
          <Card>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Default Language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'hi', label: 'Hindi' },
                  { value: 'gu', label: 'Gujarati' },
                ]}
              />
              <Select
                label="Currency"
                options={[
                  { value: 'INR', label: '₹ Indian Rupee' },
                  { value: 'USD', label: '$ US Dollar' },
                  { value: 'EUR', label: '€ Euro' },
                ]}
              />
              <Select
                label="Timezone"
                options={[
                  { value: 'IST', label: 'IST (GMT+5:30)' },
                  { value: 'UTC', label: 'UTC' },
                ]}
              />
              <Select
                label="Date Format"
                options={[
                  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                ]}
              />
            </div>
            <div className="mt-4">
              <Button icon={<Save size={16} />}>Save Settings</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
