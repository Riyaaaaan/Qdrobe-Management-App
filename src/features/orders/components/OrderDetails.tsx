import { useParams, useNavigate } from 'react-router-dom';
import { useOrder, useUpdateOrderStatus } from '../hooks/useOrders';
import { Button } from '@/shared/components';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Layout } from '@/features/dashboard/components/Layout';
import { formatCurrency } from '@/shared/utils';
import { ORDER_STATUS, ROUTES } from '@/shared/constants';
import { ArrowLeft, Phone, MessageCircle, Navigation, Building2, User } from 'lucide-react';

export const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id || '');
  const updateStatusMutation = useUpdateOrderStatus();

  const handleStatusUpdate = (status: string) => {
    if (orderId) {
      updateStatusMutation.mutate({ id: orderId, status });
    }
  };

  const orderId = id || '';

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-4 p-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="text-center py-12 p-4">
          <p className="text-muted-foreground">Order not found</p>
          <Button onClick={() => navigate(ROUTES.ORDERS)} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(ROUTES.ORDERS)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground flex-1">Order #{order.id.slice(-8)}</h1>
          <button className="p-2 hover:bg-muted rounded-lg">
            <Phone className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Image Placeholder */}
        <div className="h-80 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-muted-foreground">300x320</div>
        </div>

        {/* Pickup Section */}
        <div className="bg-card rounded-lg p-4 border border-border space-y-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">PICKUP FROM</div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{order.restaurantName}</div>
              <div className="text-sm text-muted-foreground">{order.restaurantAddress}</div>
            </div>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="bg-card rounded-lg p-4 border border-border space-y-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">DELIVER TO</div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{order.customerName}</div>
              <div className="text-sm text-muted-foreground">{order.deliveryAddress}</div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-lg p-4 border border-border space-y-3">
          <div className="font-semibold text-foreground">Order Items</div>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs font-semibold text-foreground">
                    {item.quantity}x
                  </div>
                  <div className="text-foreground">{item.name}</div>
                </div>
                <div className="font-semibold text-foreground">{formatCurrency(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-card rounded-lg p-4 border border-border space-y-3">
          <div className="font-semibold text-foreground">Payment Details</div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Bill</span>
            <span className="font-semibold text-foreground">{formatCurrency(order.totalAmount + order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Payment Method</span>
            <div className="flex items-center gap-2 bg-green-500/20 text-green-500 px-3 py-1 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Paid Online</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1 h-12 bg-card hover:bg-muted"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button
            variant="secondary"
            className="flex-1 h-12 bg-card hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        </div>

        <Button
          variant="primary"
          fullWidth
          className="h-12"
          onClick={() => navigate(`/navigation/${order.id}`)}
        >
          <Navigation className="h-4 w-4 mr-2" />
          Navigate to Pickup
        </Button>
      </div>
    </Layout>
  );
};
