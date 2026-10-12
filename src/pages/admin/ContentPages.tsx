import React, { useState } from 'react';
import { Card, PageHeader, Button, Badge, Input, EmptyState } from '../../components/ui';
import { FileText, Plus, Edit2, Trash2, Globe, Eye, EyeOff, Calendar, Palette, Layout } from 'lucide-react';

/* ============================================
   DYNAMIC CONTENT MANAGER
   ============================================ */

const contentItems = [
  { id: '1', title: 'Homepage Banner - Diwali Collection', type: 'Banner', status: 'Published', updated: '2 hours ago', page: 'Home' },
  { id: '2', title: 'About Us - Our Story', type: 'Page', status: 'Published', updated: '1 day ago', page: 'About' },
  { id: '3', title: 'Festival Guide - Navratri 2024', type: 'Article', status: 'Draft', updated: '3 days ago', page: 'Blog' },
  { id: '4', title: 'Product Care Instructions', type: 'Page', status: 'Published', updated: '1 week ago', page: 'Help' },
  { id: '5', title: 'Summer Collection Announcement', type: 'Banner', status: 'Scheduled', updated: '2 weeks ago', page: 'Home' },
  { id: '6', title: 'Artisan Spotlight - Varanasi Weavers', type: 'Article', status: 'Published', updated: '3 weeks ago', page: 'Blog' },
];

const typeColors: Record<string, 'info' | 'default' | 'warning'> = {
  'Banner': 'info',
  'Page': 'default',
  'Article': 'warning',
};

const statusColors: Record<string, 'success' | 'default' | 'warning'> = {
  'Published': 'success',
  'Draft': 'default',
  'Scheduled': 'warning',
};

export function AdminContent() {
  return (
    <div>
      <PageHeader
        title="Dynamic Content Manager"
        description="Manage banners, pages, articles, and dynamic content across your website."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Content' },
        ]}
        actions={
          <Button icon={<Plus size={16} />}>
            Add Content
          </Button>
        }
      />

      {/* Content Type Filter */}
      <div className="flex items-center gap-2 mb-6">
        {['All', 'Banners', 'Pages', 'Articles'].map(filter => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all ${
              filter === 'All'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-bg-main)]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Content List */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-main)]/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Page</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Updated</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {contentItems.map(item => (
                <tr key={item.id} className="hover:bg-[var(--color-bg-main)]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-[var(--color-text-muted)]" />
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge variant={typeColors[item.type]}>{item.type}</Badge></td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{item.page}</td>
                  <td className="px-6 py-4"><Badge variant={statusColors[item.status]}>{item.status}</Badge></td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">{item.updated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" icon={<Edit2 size={14} />} />
                      <Button variant="ghost" size="sm" icon={<Eye size={14} />} />
                      <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} className="text-[var(--color-error)]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ============================================
   FESTIVAL & THEME STUDIO
   ============================================ */

const festivals = [
  { id: '1', name: 'Diwali 2024', date: 'Nov 1, 2024', status: 'Active', products: 48, banner: '🪔' },
  { id: '2', name: 'Navratri Collection', date: 'Oct 3-11, 2024', status: 'Active', products: 32, banner: '💃' },
  { id: '3', name: 'Wedding Season', date: 'Nov-Dec 2024', status: 'Upcoming', products: 65, banner: '💍' },
  { id: '4', name: 'Holi Special', date: 'Mar 2025', status: 'Draft', products: 0, banner: '🎨' },
  { id: '5', name: 'Summer Breeze', date: 'Apr-Jun 2025', status: 'Draft', products: 0, banner: '☀️' },
];

const themes = [
  { id: '1', name: 'Royal Heritage', colors: ['#8B1E3F', '#C49A45', '#292526'], products: 24 },
  { id: '2', name: 'Earth & Nature', colors: ['#287D5A', '#A86A14', '#F8F6F2'], products: 18 },
  { id: '3', name: 'Ocean Breeze', colors: ['#2563EB', '#06B6D4', '#F0F9FF'], products: 15 },
  { id: '4', name: 'Sunset Glow', colors: ['#B42335', '#F59E0B', '#FEF3C7'], products: 12 },
];

export function AdminFestivals() {
  return (
    <div>
      <PageHeader
        title="Festival & Theme Studio"
        description="Create and manage festival collections and design themes for seasonal campaigns."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Festival Studio' },
        ]}
        actions={
          <Button icon={<Plus size={16} />}>
            Create Festival
          </Button>
        }
      />

      {/* Festival Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {festivals.map(festival => (
          <Card key={festival.id} hover>
            <div className="text-3xl mb-3">{festival.banner}</div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{festival.name}</h3>
              <Badge variant={festival.status === 'Active' ? 'success' : festival.status === 'Upcoming' ? 'warning' : 'default'}>
                {festival.status}
              </Badge>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mb-3">{festival.date}</p>
            <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-light)]">
              <span className="text-xs text-[var(--color-text-secondary)]">{festival.products} products</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" icon={<Edit2 size={14} />} />
                <Button variant="ghost" size="sm" icon={<Eye size={14} />} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Design Themes */}
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Design Themes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {themes.map(theme => (
          <Card key={theme.id} hover>
            <div className="flex items-center gap-1 mb-3">
              {theme.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{theme.name}</h4>
            <p className="text-xs text-[var(--color-text-muted)]">{theme.products} products</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   DESIGN THEMES PAGE
   ============================================ */

export function AdminThemes() {
  return (
    <div>
      <PageHeader
        title="Design Themes"
        description="Manage visual themes and design presets for your storefront."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Themes' },
        ]}
        actions={
          <Button icon={<Plus size={16} />}>
            Create Theme
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map(theme => (
          <Card key={theme.id} padding="none" hover>
            <div className="h-32 rounded-t-[var(--radius-lg)] flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
              <Layout size={32} className="text-white/80" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">{theme.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                {theme.colors.map((color, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border border-[var(--color-border)]" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-muted)]">{theme.products} products</span>
                <Button variant="outline" size="sm">Apply</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
