import { useState } from 'react';
import { useEarnings } from '../hooks/useEarnings';
import { Layout } from '@/features/dashboard/components/Layout';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/shared/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Calendar, Search, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

export const Earnings = () => {
  const { data: earnings, isLoading } = useEarnings();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'today' | 'weekly' | 'monthly'>('weekly');

  const earningsArray = Array.isArray(earnings) ? earnings : [];
  
  const totalEarnings = earningsArray.reduce((sum, e) => sum + e.totalEarnings, 0);
  const totalDeliveries = earningsArray.reduce((sum, e) => sum + e.deliveryCount, 0);
  const onlineTime = '8h 30m'; // This would come from API

  // Weekly data for chart
  const weeklyData = [
    { day: 'Mon', earnings: 15 },
    { day: 'Tue', earnings: 20 },
    { day: 'Wed', earnings: 25 },
    { day: 'Thu', earnings: 30 },
    { day: 'Fri', earnings: 40 },
    { day: 'Sat', earnings: 50 },
    { day: 'Sun', earnings: 35 },
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-4 p-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground flex-1">Earnings</h1>
          <button className="p-2 hover:bg-muted rounded-lg">
            <Calendar className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-card rounded-lg p-1">
          {(['today', 'weekly', 'monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Weekly Earnings Summary */}
        <div className="bg-card rounded-lg p-6 border border-border space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Weekly Earnings</div>
            <div className="text-3xl font-bold text-foreground">{formatCurrency(totalEarnings)}</div>
            <div className="text-sm text-green-500 flex items-center gap-1 mt-1">
              <span>↑</span>
              <span>+5.2%</span>
              <span className="text-muted-foreground">This week</span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="earnings" fill="#ff8f00" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <div className="text-xs text-muted-foreground mb-1">Total Earnings</div>
            <div className="text-lg font-bold text-foreground">{formatCurrency(totalEarnings)}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <div className="text-xs text-muted-foreground mb-1">Total Deliveries</div>
            <div className="text-lg font-bold text-foreground">{totalDeliveries}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <div className="text-xs text-muted-foreground mb-1">Online Time</div>
            <div className="text-lg font-bold text-foreground">{onlineTime}</div>
          </div>
        </div>

        {/* Delivery History */}
        <div className="bg-card rounded-lg p-4 border border-border space-y-4">
          <div className="font-semibold text-foreground">Delivery History</div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order ID"
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* History List */}
          <div className="space-y-3">
            {earningsArray.length > 0 ? (
              earningsArray.slice(0, 10).map((earning) => (
                <div key={earning.id} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Receipt className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">Order #{earning.id.slice(-5)}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(earning.date)}</div>
                  </div>
                  <div className="text-sm font-semibold text-green-500">
                    +{formatCurrency(earning.totalEarnings)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No delivery history available
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
