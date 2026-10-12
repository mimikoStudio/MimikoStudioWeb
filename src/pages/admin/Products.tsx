import React, { useState } from 'react';
import { Card, PageHeader, Button, Badge, SearchBar, Input, Select, Modal, EmptyState } from '../../components/ui';
import { Plus, Edit2, Trash2, Eye, Filter, Grid3X3, List } from 'lucide-react';

const products = [
  { id: '1', name: 'Banarasi Silk Saree - Royal Gold', category: 'Sarees', price: '₹12,500', stock: 24, status: 'Active', image: '🧵' },
  { id: '2', name: 'Kanchipuram Silk - Temple Border', category: 'Sarees', price: '₹8,900', stock: 18, status: 'Active', image: '🪡' },
  { id: '3', name: 'Chanderi Cotton Dupatta', category: 'Dupattas', price: '₹3,200', stock: 45, status: 'Active', image: '🧶' },
  { id: '4', name: 'Bandhani Print Set', category: 'Sets', price: '₹5,600', stock: 12, status: 'Low Stock', image: '🎨' },
  { id: '5', name: 'Paithani Handloom Saree', category: 'Sarees', price: '₹18,000', stock: 8, status: 'Active', image: '✨' },
  { id: '6', name: 'Ikat Cotton Fabric (per meter)', category: 'Fabric', price: '₹850', stock: 120, status: 'Active', image: '📐' },
  { id: '7', name: 'Phulkari Embroidered Stole', category: 'Stoles', price: '₹4,500', stock: 0, status: 'Out of Stock', image: '🌸' },
  { id: '8', name: 'Tussar Silk Unstitched', category: 'Fabric', price: '₹6,200', stock: 30, status: 'Active', image: '🪢' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  'Active': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'error',
};

export function AdminProducts() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage your fabric art collection and inventory."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Products' },
        ]}
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setShowAddModal(true)}>
            Add Product
          </Button>
        }
      />

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 w-full sm:max-w-xs">
            <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
          </div>
          <div className="flex items-center gap-2">
            <Select
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'sarees', label: 'Sarees' },
                { value: 'dupattas', label: 'Dupattas' },
                { value: 'fabric', label: 'Fabric' },
                { value: 'sets', label: 'Sets' },
              ]}
              className="w-40"
            />
            <Button variant="outline" size="md" icon={<Filter size={16} />}>
              Filters
            </Button>
            <div className="flex items-center border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Product Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(product => (
            <Card key={product.id} padding="none" hover onClick={() => setSelectedProduct(product)}>
              <div className="aspect-square bg-[var(--color-bg-main)] rounded-t-[var(--radius-lg)] flex items-center justify-center text-4xl">
                {product.image}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-2">{product.name}</h3>
                  <Badge variant={statusVariant[product.status]}>{product.status}</Badge>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--color-primary)]">{product.price}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">Stock: {product.stock}</span>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--color-border-light)]">
                  <Button variant="ghost" size="sm" icon={<Eye size={14} />} className="flex-1">View</Button>
                  <Button variant="ghost" size="sm" icon={<Edit2 size={14} />} className="flex-1">Edit</Button>
                  <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} className="text-[var(--color-error)]" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-main)]/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-light)]">
                {filtered.map(product => (
                  <tr key={product.id} className="hover:bg-[var(--color-bg-main)]/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-bg-main)] flex items-center justify-center text-lg">{product.image}</span>
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{product.category}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">{product.price}</td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{product.stock}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[product.status]}>{product.status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" icon={<Eye size={14} />} />
                        <Button variant="ghost" size="sm" icon={<Edit2 size={14} />} />
                        <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} className="text-[var(--color-error)]" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAddModal(false)}>Save Product</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input label="Product Name" placeholder="Enter product name" />
          </div>
          <Select
            label="Category"
            options={[
              { value: 'sarees', label: 'Sarees' },
              { value: 'dupattas', label: 'Dupattas' },
              { value: 'fabric', label: 'Fabric' },
              { value: 'sets', label: 'Sets' },
              { value: 'stoles', label: 'Stoles' },
            ]}
          />
          <Input label="Price (₹)" type="number" placeholder="0.00" />
          <Input label="Stock Quantity" type="number" placeholder="0" />
          <Select
            label="Status"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'draft', label: 'Draft' },
              { value: 'archived', label: 'Archived' },
            ]}
          />
          <div className="md:col-span-2">
            <Input label="Description" placeholder="Product description..." />
          </div>
        </div>
      </Modal>

      {/* Product Detail Modal */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name || ''}
        size="lg"
        footer={
          <>
            <Button variant="destructive" icon={<Trash2 size={16} />}>Delete</Button>
            <Button variant="secondary" icon={<Edit2 size={16} />}>Edit</Button>
            <Button onClick={() => setSelectedProduct(null)}>Close</Button>
          </>
        }
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="aspect-video bg-[var(--color-bg-main)] rounded-[var(--radius-md)] flex items-center justify-center text-6xl">
              {selectedProduct.image}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Category</p>
                <p className="text-sm font-medium">{selectedProduct.category}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Price</p>
                <p className="text-sm font-medium">{selectedProduct.price}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Stock</p>
                <p className="text-sm font-medium">{selectedProduct.stock} units</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Status</p>
                <Badge variant={statusVariant[selectedProduct.status]}>{selectedProduct.status}</Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
