import { useState, useMemo } from 'react';
import { useOrders, useAcceptOrder, useRejectOrder } from '@/features/orders/hooks/useOrders';
import { useEarnings } from '@/features/earnings/hooks/useEarnings';
import { useLocation } from '@/features/navigation/hooks/useLocation';
import { Layout } from './Layout';
import { OrderCard } from '@/features/orders/components/OrderCard';
import { formatCurrency } from '@/shared/utils';
import { ORDER_STATUS } from '@/shared/constants';
import { Button } from '@/shared/components';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { MapPin, DollarSign, Navigation as NavigationIcon } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useUpdateProfile } from '@/features/profile/hooks/useProfile';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { data: pendingOrders, isLoading: ordersLoading } = useOrders(ORDER_STATUS.PENDING);
  const { data: activeOrders, isLoading: activeLoading } = useOrders(ORDER_STATUS.ACCEPTED);
  const { data: earnings } = useEarnings();
  const { location: currentLocation } = useLocation();
  const { user, updateUser } = useAuthStore();
  const updateProfileMutation = useUpdateProfile();
  const acceptMutation = useAcceptOrder();
  const rejectMutation = useRejectOrder();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'new' | 'active'>('new');

  const earningsArray = Array.isArray(earnings) ? earnings : [];
  const todayEarnings = earningsArray.find((e) => {
    const today = new Date().toISOString().split('T')[0];
    return e.date === today;
  });

  const toggleOnlineStatus = () => {
    const newStatus = !user?.isOnline;
    updateUser({ isOnline: newStatus });
    if (user) {
      updateProfileMutation.mutate({ isOnline: newStatus });
    }
  };

  const pendingOrdersArray = Array.isArray(pendingOrders) ? pendingOrders : [];
  const activeOrdersArray = Array.isArray(activeOrders) ? activeOrders : [];

  // Calculate distance to nearest pickup for active orders
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const nearestActiveOrder = useMemo(() => {
    if (!currentLocation || activeOrdersArray.length === 0) return null;
    
    let nearest = activeOrdersArray[0];
    let minDistance = Infinity;
    
    activeOrdersArray.forEach(order => {
      if (order.pickupLocation) {
        const distance = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          order.pickupLocation.lat,
          order.pickupLocation.lng
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearest = order;
        }
      }
    });
    
    return { order: nearest, distance: minDistance };
  }, [currentLocation, activeOrdersArray]);

  return (
    <Layout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${user?.isOnline ? 'text-green-500' : 'text-muted-foreground'}`}>
              {user?.isOnline ? "You're Online" : "You're Offline"}
            </span>
            <button
              onClick={toggleOnlineStatus}
              disabled={updateProfileMutation.isPending}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                user?.isOnline ? 'bg-green-500' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user?.isOnline ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Live Location Indicator for Active Orders */}
        {currentLocation && activeOrdersArray.length > 0 && nearestActiveOrder && (
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-4 border border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <NavigationIcon className="h-6 w-6 text-primary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Next Pickup</div>
                  <div className="text-xs text-muted-foreground">{nearestActiveOrder.order.restaurantName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{nearestActiveOrder.distance.toFixed(1)} km</div>
                <div className="text-xs text-muted-foreground">away</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 bg-card rounded-lg p-1">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
              activeTab === 'new'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            New Orders ({pendingOrdersArray.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
              activeTab === 'active'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Active Orders ({activeOrdersArray.length})
          </button>
        </div>

        {/* Content */}
        {ordersLoading || activeLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'new' ? (
              pendingOrdersArray.length > 0 ? (
                pendingOrdersArray.map((order) => (
                  <div key={order.id} className="bg-card rounded-lg p-4 border border-border space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">New Order Request</h2>
                    
                    {/* Countdown Timer */}
                    <div className="flex gap-2 justify-center">
                      <div className="bg-background rounded-lg px-4 py-2 border border-border">
                        <div className="text-xs text-muted-foreground text-center">Hours</div>
                        <div className="text-2xl font-bold text-foreground text-center">00</div>
                      </div>
                      <div className="bg-background rounded-lg px-4 py-2 border border-border">
                        <div className="text-xs text-muted-foreground text-center">Minutes</div>
                        <div className="text-2xl font-bold text-foreground text-center">00</div>
                      </div>
                      <div className="bg-primary/20 rounded-lg px-4 py-2 border-2 border-primary">
                        <div className="text-xs text-primary text-center">Seconds</div>
                        <div className="text-2xl font-bold text-primary text-center">45</div>
                      </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-muted-foreground">Map View</div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">Pickup</div>
                          <div className="text-foreground">{order.restaurantAddress}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">Drop-off</div>
                          <div className="text-foreground">{order.deliveryAddress}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">Estimated Earnings</div>
                          <div className="text-green-500 font-semibold">{formatCurrency(order.deliveryFee)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="destructive"
                        fullWidth
                        className="h-12"
                        onClick={() => rejectMutation.mutate(order.id)}
                        isLoading={rejectMutation.isPending}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="primary"
                        fullWidth
                        className="h-12 bg-green-500 hover:bg-green-600"
                        onClick={() => acceptMutation.mutate(order.id)}
                        isLoading={acceptMutation.isPending}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <p className="text-muted-foreground">No new orders available</p>
                </div>
              )
            ) : (
              activeOrdersArray.length > 0 ? (
                activeOrdersArray.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    showActions={false}
                    onAccept={(id) => acceptMutation.mutate(id)}
                    onReject={(id) => rejectMutation.mutate(id)}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <p className="text-muted-foreground">No active orders</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
