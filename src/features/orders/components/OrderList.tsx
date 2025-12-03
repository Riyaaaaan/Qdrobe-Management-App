import { useOrders, useAcceptOrder, useRejectOrder } from '../hooks/useOrders';
import { OrderCard } from './OrderCard';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ORDER_STATUS } from '@/shared/constants';

interface OrderListProps {
  status?: string;
  showActions?: boolean;
}

export const OrderList = ({ status, showActions = true }: OrderListProps) => {
  const { data: orders, isLoading, error } = useOrders(status);
  const acceptMutation = useAcceptOrder();
  const rejectMutation = useRejectOrder();

  // Ensure orders is always an array
  const ordersArray = Array.isArray(orders) ? orders : [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl border border-pink-100/50 p-5">
            <Skeleton className="h-32 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading orders. Please try again.</p>
      </div>
    );
  }

  if (!ordersArray || ordersArray.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl border border-pink-100/50 p-12">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-500 font-medium">No orders available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ordersArray.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onAccept={(id) => acceptMutation.mutate(id)}
          onReject={(id) => rejectMutation.mutate(id)}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

