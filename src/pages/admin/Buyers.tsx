import React, { useState } from 'react';
import { Card, PageHeader, Button, Badge, SearchBar, DataTable, StatCard } from '../../components/ui';
import { Users, UserPlus, Mail, Phone, MapPin, MoreVertical } from 'lucide-react';

const buyers = [
  { id: '1', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', location: 'Mumbai, MH', orders: 12, spent: '₹1,45,000', status: 'VIP', joined: 'Jan 2023' },
  { id: '2', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 87654 32109', location: 'Delhi, DL', orders: 8, spent: '₹89,500', status: 'Regular', joined: 'Mar 2023' },
  { id: '3', name: 'Anita Patel', email: 'anita@example.com', phone: '+91 76543 21098', location: 'Ahmedabad, GJ', orders: 15, spent: '₹2,10,000', status: 'VIP', joined: 'Dec 2022' },
  { id: '4', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 65432 10987', location: 'Jaipur, RJ', orders: 5, spent: '₹42,000', status: 'New', joined: 'Aug 2024' },
  { id: '5', name: 'Meera Joshi', email: 'meera@example.com', phone: '+91 54321 09876', location: 'Pune, MH', orders: 22, spent: '₹3,20,000', status: 'VIP', joined: 'Jun 2022' },
  { id: '6', name: 'Suresh Reddy', email: 'suresh@example.com', phone: '+91 43210 98765', location: 'Hyderabad, TS', orders: 3, spent: '₹18,500', status: 'New', joined: 'Oct 2024' },
];

const statusVariant: Record<string, 'success' | 'info' | 'default'> = {
  'VIP': 'success',
  'Regular': 'info',
  'New': 'default',
};

export function AdminBuyers() {
  const [search, setSearch] = useState('');

  const filtered = buyers.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Buyers"
        description="Manage your customer relationships and buyer profiles."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Buyers' },
        ]}
        actions={
          <Button icon={<UserPlus size={16} />}>
            Add Buyer
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Buyers" value="2,847" change="+124 this month" changeType="positive" icon={<Users size={20} />} />
        <StatCard title="VIP Buyers" value="342" change="+18 this month" changeType="positive" icon={<Users size={20} />} />
        <StatCard title="New This Month" value="124" change="+8% from last month" changeType="positive" icon={<UserPlus size={20} />} />
        <StatCard title="Avg. Order Value" value="₹4,250" change="+5.2%" changeType="positive" icon={<Users size={20} />} />
      </div>

      {/* Search */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 w-full sm:max-w-xs">
            <SearchBar value={search} onChange={setSearch} placeholder="Search buyers..." />
          </div>
        </div>
      </Card>

      {/* Buyers Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-main)]/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {filtered.map(buyer => (
                <tr key={buyer.id} className="hover:bg-[var(--color-bg-main)]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-sm font-medium text-[var(--color-primary)]">
                        {buyer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">{buyer.name}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">Since {buyer.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[var(--color-text-primary)]">{buyer.email}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{buyer.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{buyer.location}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[var(--color-text-primary)]">{buyer.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[var(--color-text-primary)]">{buyer.spent}</td>
                  <td className="px-6 py-4"><Badge variant={statusVariant[buyer.status]}>{buyer.status}</Badge></td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} />
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
