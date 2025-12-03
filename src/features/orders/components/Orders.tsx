import { useState } from 'react';
import { OrderList } from './OrderList';
import { ORDER_STATUS } from '@/shared/constants';
import { Layout } from '@/features/dashboard/components/Layout';

export const Orders = () => {
  const [filter, setFilter] = useState<string>('');

  const filters = [
    { label: 'All', value: '' },
    { label: 'Pending', value: ORDER_STATUS.PENDING },
    { label: 'Active', value: ORDER_STATUS.ACCEPTED },
    { label: 'In Transit', value: ORDER_STATUS.PICKED },
    { label: 'Completed', value: ORDER_STATUS.DELIVERED },
  ];

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-foreground mb-6">Orders</h1>
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                filter === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <OrderList status={filter || undefined} showActions={filter === ORDER_STATUS.PENDING || !filter} />
      </div>
    </Layout>
  );
};
