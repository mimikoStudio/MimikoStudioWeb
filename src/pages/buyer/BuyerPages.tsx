import React, { useState } from 'react';
import { Card, Button, Badge, SearchBar } from '../../components/ui';
import { useBranding } from '../../context/BrandingContext';
import { ShoppingBag, Heart, Star, ArrowRight, Sparkles, Truck, Shield, RotateCcw } from 'lucide-react';

/* ============================================
   BUYER HOME PAGE
   ============================================ */

const featuredProducts = [
  { id: '1', name: 'Banarasi Silk Saree', price: '₹12,500', originalPrice: '₹15,000', rating: 4.8, reviews: 124, image: '🧵', category: 'Sarees', badge: 'Bestseller' },
  { id: '2', name: 'Kanchipuram Temple Border', price: '₹8,900', originalPrice: null, rating: 4.9, reviews: 89, image: '🪡', category: 'Sarees', badge: 'New' },
  { id: '3', name: 'Chanderi Cotton Dupatta', price: '₹3,200', originalPrice: '₹4,000', rating: 4.7, reviews: 67, image: '🧶', category: 'Dupattas', badge: null },
  { id: '4', name: 'Bandhani Print Set', price: '₹5,600', originalPrice: null, rating: 4.6, reviews: 45, image: '🎨', category: 'Sets', badge: 'Trending' },
  { id: '5', name: 'Paithani Handloom', price: '₹18,000', originalPrice: '₹22,000', rating: 5.0, reviews: 34, image: '✨', category: 'Sarees', badge: 'Premium' },
  { id: '6', name: 'Ikat Cotton Fabric', price: '₹850', originalPrice: null, rating: 4.5, reviews: 156, image: '📐', category: 'Fabric', badge: null },
  { id: '7', name: 'Phulkari Embroidered Stole', price: '₹4,500', originalPrice: '₹5,500', rating: 4.8, reviews: 78, image: '🌸', category: 'Stoles', badge: 'Limited' },
  { id: '8', name: 'Tussar Silk Unstitched', price: '₹6,200', originalPrice: null, rating: 4.7, reviews: 42, image: '🪢', category: 'Fabric', badge: null },
];

const collections = [
  { name: 'Wedding Collection', count: 65, gradient: 'from-[var(--color-primary)] to-[var(--color-accent)]', emoji: '💍' },
  { name: 'Festive Edit', count: 48, gradient: 'from-[#C49A45] to-[#8B1E3F]', emoji: '🪔' },
  { name: 'Everyday Elegance', count: 120, gradient: 'from-[#287D5A] to-[#06B6D4]', emoji: '🌿' },
  { name: 'Artisan Specials', count: 32, gradient: 'from-[#701630] to-[#C49A45]', emoji: '🎨' },
];

export function BuyerHome({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { branding } = useBranding();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-bg-sidebar)] via-[#2A1A2E] to-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm mb-6">
              <Sparkles size={14} />
              <span>New Diwali Collection Now Live</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Handcrafted Fabric Art,
              <br />
              <span className="text-[var(--color-accent)]">Woven with Love</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-lg">
              Discover exquisite handloom sarees, dupattas, and fabrics from India's finest artisans. Each piece tells a story of tradition and craftsmanship.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={() => onNavigate('/products')}>
                Shop Collection
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Our Story
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-3xl" />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Truck size={20} />, title: 'Free Shipping', desc: 'On orders above ₹2,000' },
            { icon: <Shield size={20} />, title: 'Authentic Handloom', desc: 'Certified genuine products' },
            { icon: <RotateCcw size={20} />, title: 'Easy Returns', desc: '7-day return policy' },
          ].map((feature, i) => (
            <Card key={i} className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)] mx-auto mb-2">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{feature.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Shop by Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((col, i) => (
            <Card key={i} padding="none" hover onClick={() => onNavigate('/collections')}>
              <div className={`h-32 rounded-t-[var(--radius-lg)] bg-gradient-to-br ${col.gradient} flex items-center justify-center`}>
                <span className="text-4xl">{col.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{col.name}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{col.count} products</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Featured Products</h2>
          <Button variant="outline" size="sm" onClick={() => onNavigate('/products')}>
            View All <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <Card key={product.id} padding="none" hover>
              <div className="relative aspect-square bg-[var(--color-bg-main)] rounded-t-[var(--radius-lg)] flex items-center justify-center">
                <span className="text-5xl">{product.image}</span>
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)] text-white">
                    {product.badge}
                  </span>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors">
                  <Heart size={16} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">{product.category}</p>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
                  <span className="text-xs font-medium text-[var(--color-text-primary)]">{product.rating}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-[var(--color-primary)]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-[var(--color-text-muted)] line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition-colors">
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================================
   BUYER PRODUCTS PAGE
   ============================================ */

export function BuyerProducts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Sarees', 'Dupattas', 'Fabric', 'Sets', 'Stoles'];

  const filtered = featuredProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Our Collection</h1>
        <p className="text-[var(--color-text-secondary)]">Explore our handpicked selection of finest fabric art from across India.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="w-full sm:w-64">
          <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(product => (
          <Card key={product.id} padding="none" hover>
            <div className="relative aspect-square bg-[var(--color-bg-main)] rounded-t-[var(--radius-lg)] flex items-center justify-center">
              <span className="text-5xl">{product.image}</span>
              {product.badge && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)] text-white">
                  {product.badge}
                </span>
              )}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors">
                <Heart size={16} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-xs text-[var(--color-text-muted)] mb-1">{product.category}</p>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">{product.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star size={12} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
                <span className="text-xs font-medium">{product.rating}</span>
                <span className="text-xs text-[var(--color-text-muted)]">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[var(--color-primary)]">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-[var(--color-text-muted)] line-through">{product.originalPrice}</span>
                  )}
                </div>
                <button className="px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white text-xs font-medium hover:bg-[var(--color-primary-hover)] transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

/* ============================================
   BUYER COLLECTIONS PAGE
   ============================================ */

export function BuyerCollections() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Collections</h1>
        <p className="text-[var(--color-text-secondary)]">Curated collections for every occasion and style.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col, i) => (
          <Card key={i} padding="none" hover className="overflow-hidden">
            <div className={`h-48 bg-gradient-to-br ${col.gradient} flex items-center justify-center`}>
              <span className="text-6xl">{col.emoji}</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">{col.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{col.count} handpicked products</p>
              <Button variant="outline" size="sm">
                Explore Collection <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   BUYER FESTIVALS PAGE
   ============================================ */

export function BuyerFestivals() {
  const festivalData = [
    { name: 'Diwali Collection', desc: 'Celebrate the festival of lights with our special handloom collection.', emoji: '🪔', date: 'Oct 20 - Nov 15', products: 48 },
    { name: 'Navratri Special', desc: 'Vibrant colors and traditional patterns for nine nights of celebration.', emoji: '💃', date: 'Oct 3 - Oct 11', products: 32 },
    { name: 'Wedding Season', desc: 'Exquisite bridal and occasion wear for the wedding season.', emoji: '💍', date: 'Nov - Dec 2024', products: 65 },
    { name: 'Makar Sankranti', desc: 'Kite festival specials with bright colors and light fabrics.', emoji: '🪁', date: 'Jan 14, 2025', products: 24 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Festival Collections</h1>
        <p className="text-[var(--color-text-secondary)]">Special collections curated for Indian festivals and celebrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {festivalData.map((fest, i) => (
          <Card key={i} hover>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] flex items-center justify-center text-3xl flex-shrink-0">
                {fest.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">{fest.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">{fest.desc}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                  <span>{fest.date}</span>
                  <span>{fest.products} products</span>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  View Collection
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   BUYER ABOUT PAGE
   ============================================ */

export function BuyerAbout() {
  const { branding } = useBranding();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">About {branding.companyName}</h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          We are passionate about preserving India's rich textile heritage while bringing contemporary design to every piece.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Our Story</h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Founded with a vision to connect India's finest artisans with the world, {branding.companyName} has been curating exceptional fabric art since 2018. Every piece in our collection is handpicked, ensuring authenticity and quality.
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Our Mission</h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            To empower traditional artisans by providing them a global platform, while offering our customers access to genuine handloom products that celebrate India's diverse textile traditions.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '500+', label: 'Artisans' },
          { value: '12', label: 'States' },
          { value: '10,000+', label: 'Happy Customers' },
          { value: '50,000+', label: 'Products Sold' },
        ].map((stat, i) => (
          <Card key={i} className="text-center">
            <p className="text-2xl font-bold text-[var(--color-primary)]">{stat.value}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
