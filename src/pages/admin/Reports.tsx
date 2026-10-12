import React from 'react';
import { Card, PageHeader, StatCard, Badge, Button } from '../../components/ui';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Eye } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 320000, orders: 145, visitors: 8200 },
  { month: 'Feb', revenue: 280000, orders: 128, visitors: 7500 },
  { month: 'Mar', revenue: 410000, orders: 189, visitors: 11200 },
  { month: 'Apr', revenue: 380000, orders: 167, visitors: 9800 },
  { month: 'May', revenue: 450000, orders: 201, visitors: 12500 },
  { month: 'Jun', revenue: 520000, orders: 234, visitors: 14200 },
  { month: 'Jul', revenue: 480000, orders: 218, visitors: 13100 },
  { month: 'Aug', revenue: 560000, orders: 256, visitors: 15800 },
  { month: 'Sep', revenue: 490000, orders: 223, visitors: 13900 },
  { month: 'Oct', revenue: 620000, orders: 289, visitors: 18200 },
  { month: 'Nov', revenue: 580000, orders: 267, visitors: 16500 },
  { month: 'Dec', revenue: 710000, orders: 334, visitors: 21000 },
];

export function AdminReports() {
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Analytics and performance insights for your fabric art business."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Reports' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Export PDF</Button>
            <Button variant="outline" size="sm">Export CSV</Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Annual Revenue" value="₹58,00,000" change="+18.2% YoY" changeType="positive" icon={<DollarSign size={20} />} />
        <StatCard title="Total Orders" value="2,651" change="+12.4% YoY" changeType="positive" icon={<ShoppingBag size={20} />} />
        <StatCard title="Site Visitors" value="1,61,900" change="+24.1% YoY" changeType="positive" icon={<Eye size={20} />} />
        <StatCard title="Avg. Order Value" value="₹4,350" change="-2.3% YoY" changeType="negative" icon={<BarChart3 size={20} />} />
      </div>

      {/* Revenue Chart */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Monthly Revenue</h3>
          <Badge variant="success">+18.2% vs last year</Badge>
        </div>
        <div className="flex items-end justify-between h-56 gap-1 sm:gap-2 px-2">
          {monthlyData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="relative w-full flex justify-center">
                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-[var(--color-text-primary)] text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  ₹{(data.revenue / 1000).toFixed(0)}K
                </div>
              </div>
              <div
                className="w-full rounded-t-[var(--radius-sm)] bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-300 hover:opacity-80"
                style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
              />
              <span className="text-[10px] sm:text-xs text-[var(--color-text-muted)] mt-1">{data.month}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Sales by Category</h3>
          <div className="space-y-3">
            {[
              { name: 'Sarees', value: 45, amount: '₹26,10,000' },
              { name: 'Dupattas', value: 20, amount: '₹11,60,000' },
              { name: 'Fabric', value: 18, amount: '₹10,44,000' },
              { name: 'Sets', value: 12, amount: '₹6,96,000' },
              { name: 'Stoles', value: 5, amount: '₹2,90,000' },
            ].map(cat => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-primary)] font-medium">{cat.name}</span>
                  <span className="text-[var(--color-text-secondary)]">{cat.amount} ({cat.value}%)</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--color-bg-main)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
                    style={{ width: `${cat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Top Performing Regions</h3>
          <div className="space-y-3">
            {[
              { name: 'Maharashtra', orders: 856, growth: '+15%' },
              { name: 'Delhi NCR', orders: 634, growth: '+22%' },
              { name: 'Gujarat', orders: 498, growth: '+8%' },
              { name: 'Karnataka', orders: 312, growth: '+18%' },
              { name: 'Rajasthan', orders: 201, growth: '+12%' },
            ].map(region => (
              <div key={region.name} className="flex items-center justify-between py-2 border-b border-[var(--color-border-light)] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{region.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{region.orders} orders</p>
                </div>
                <Badge variant="success">{region.growth}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
