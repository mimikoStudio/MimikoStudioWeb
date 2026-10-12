import React from 'react';
import { Card, StatCard, PageHeader, Badge, Button } from '../../components/ui';
import { Package, Users, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const recentOrders = [
  { id: 'ORD-001', buyer: 'Priya Sharma', product: 'Banarasi Silk Saree', amount: '₹12,500', status: 'Delivered', date: '2 hours ago' },
  { id: 'ORD-002', buyer: 'Rajesh Kumar', product: 'Kanchipuram Silk', amount: '₹8,900', status: 'Processing', date: '4 hours ago' },
  { id: 'ORD-003', buyer: 'Anita Patel', product: 'Chanderi Dupatta', amount: '₹3,200', status: 'Shipped', date: '6 hours ago' },
  { id: 'ORD-004', buyer: 'Vikram Singh', product: 'Bandhani Set', amount: '₹5,600', status: 'Pending', date: '8 hours ago' },
  { id: 'ORD-005', buyer: 'Meera Joshi', product: 'Paithani Saree', amount: '₹18,000', status: 'Delivered', date: '1 day ago' },
];

const statusColors: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  'Delivered': 'success',
  'Processing': 'warning',
  'Shipped': 'info',
  'Pending': 'default',
};

const topProducts = [
  { name: 'Banarasi Silk Saree', sales: 142, revenue: '₹17,75,000' },
  { name: 'Kanchipuram Collection', sales: 98, revenue: '₹8,72,200' },
  { name: 'Chanderi Dupatta', sales: 87, revenue: '₹2,78,400' },
  { name: 'Bandhani Set', sales: 65, revenue: '₹3,64,000' },
  { name: 'Paithani Saree', sales: 54, revenue: '₹9,72,000' },
];

export function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your store today."
        actions={
          <Button variant="secondary" icon={<Clock size={16} />}>
            Last 7 days
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value="₹4,82,350"
          change="+12.5% from last month"
          changeType="positive"
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          title="Total Orders"
          value="1,284"
          change="+8.2% from last month"
          changeType="positive"
          icon={<ShoppingCart size={20} />}
        />
        <StatCard
          title="Active Products"
          value="342"
          change="+5 new this week"
          changeType="neutral"
          icon={<Package size={20} />}
        />
        <StatCard
          title="Total Buyers"
          value="2,847"
          change="-2.1% from last month"
          changeType="negative"
          icon={<Users size={20} />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart Placeholder */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Revenue Overview</h3>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-[var(--radius-sm)] text-xs font-medium bg-[var(--color-primary-light)] text-[var(--color-primary)]">Monthly</button>
              <button className="px-3 py-1 rounded-[var(--radius-sm)] text-xs font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-bg-main)]">Weekly</button>
            </div>
          </div>
          {/* Simple chart visualization */}
          <div className="flex items-end justify-between h-48 gap-2 px-2">
            {[65, 45, 78, 52, 88, 72, 95, 68, 82, 90, 75, 98].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-[var(--radius-sm)] bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-primary)]/60 transition-all duration-500 hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--color-border-light)] last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{product.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{product.sales} sales</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">{product.revenue}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card padding="none">
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Recent Orders</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-main)]/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-[var(--color-bg-main)]/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[var(--color-primary)]">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-primary)]">{order.buyer}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[var(--color-text-primary)]">{order.amount}</td>
                  <td className="px-6 py-4">
                    <Badge variant={statusColors[order.status] || 'default'}>{order.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
