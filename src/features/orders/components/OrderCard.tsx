import { Order } from '@/shared/types';
import { formatCurrency, formatTimeAgo } from '@/shared/utils';
import { ORDER_STATUS, ORDER_STATUS_LABELS } from '@/shared/constants';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components';
import { MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
}

export const OrderCard = ({ order, onAccept, onReject, showActions = true }: OrderCardProps) => {
  const navigate = useNavigate();
  const isPending = order.status === ORDER_STATUS.PENDING;
  const isPicked = order.status === ORDER_STATUS.PICKED;
  const isAccepted = order.status === ORDER_STATUS.ACCEPTED;

  const getStatusText = () => {
    if (isAccepted) return 'Heading to Pickup';
    if (isPicked) return 'Delivering to Customer';
    return ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS];
  };

  const getStatusColor = () => {
    if (isAccepted || isPicked) return 'text-orange-500';
    return 'text-muted-foreground';
  };

  return (
    <div
      className="bg-card rounded-lg p-4 border border-border space-y-4"
      onClick={() => !showActions && navigate(`/orders/${order.id}`)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Order #{order.id.slice(-5)}</h3>
          <p className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</p>
        </div>
        {!showActions && (
          <div className="flex gap-2">
            <button className="p-2 hover:bg-muted rounded-lg">
              <Phone className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg">
              <MessageCircle className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      {isAccepted && (
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Pickup</div>
              <div className="text-foreground text-sm">{order.restaurantAddress}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Drop-off</div>
              <div className="text-foreground text-sm">{order.deliveryAddress}</div>
            </div>
          </div>
        </div>
      )}

      {isPicked && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Customer: {order.customerName}</div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Drop-off</div>
              <div className="text-foreground text-sm">{order.deliveryAddress}</div>
            </div>
          </div>
        </div>
      )}

      {showActions && isPending && (
        <div className="flex gap-3 pt-2">
          <Button
            variant="destructive"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onReject?.(order.id);
            }}
            className="h-12"
          >
            Decline
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onAccept?.(order.id);
            }}
            className="h-12 bg-green-500 hover:bg-green-600"
          >
            Accept
          </Button>
        </div>
      )}

      {!showActions && (
        <Button
          variant="primary"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            if (isPicked) {
              navigate(`/navigation/${order.id}`);
            } else {
              navigate(`/orders/${order.id}`);
            }
          }}
          className="h-12"
        >
          {isPicked ? (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              Navigate to Customer
            </>
          ) : (
            'Mark as Picked Up'
          )}
        </Button>
      )}
    </div>
  );
};
