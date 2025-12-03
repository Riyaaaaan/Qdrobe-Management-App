import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder, useUpdateOrderStatus } from '@/features/orders/hooks/useOrders';
import { useOrderLocation } from '@/features/orders/hooks/useOrderLocation';
import { useLocation } from '../hooks/useLocation';
import { MapView } from './MapView';
import { LocationStatus } from './LocationStatus';
import { Layout } from '@/features/dashboard/components/Layout';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Button } from '@/shared/components';
import { formatCurrency, formatDuration } from '@/shared/utils';
import { ROUTES, ORDER_STATUS } from '@/shared/constants';
import { ArrowLeft, MapPin, Clock, Navigation2, Plus, Minus, Maximize2, Volume2 } from 'lucide-react';

export const Navigation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(orderId || '');
  const { location: currentLocation, error: locationError } = useLocation();
  const { data: trackedLocation } = useOrderLocation(orderId);
  const updateStatusMutation = useUpdateOrderStatus();
  const [route, setRoute] = useState<Array<[number, number]>>([]);

  // Use tracked location from server if available, otherwise use device location
  const activeLocation = trackedLocation || currentLocation;

  const mapCenter: [number, number] = useMemo(() => {
    if (activeLocation) {
      return [activeLocation.lat, activeLocation.lng];
    }
    if (order?.pickupLocation) {
      return [order.pickupLocation.lat, order.pickupLocation.lng];
    }
    return [28.6139, 77.2090];
  }, [activeLocation, order]);

  const markers = useMemo(() => {
    const markersArray = [];
    
    if (order?.pickupLocation) {
      markersArray.push({
        position: [order.pickupLocation.lat, order.pickupLocation.lng] as [number, number],
        label: `Pickup: ${order.restaurantName}`,
        color: '#10B981',
      });
    }

    if (order?.deliveryLocation) {
      markersArray.push({
        position: [order.deliveryLocation.lat, order.deliveryLocation.lng] as [number, number],
        label: `Delivery: ${order.deliveryAddress}`,
        color: '#ff8f00',
      });
    }

    return markersArray;
  }, [order]);

  useMemo(() => {
    if (order?.pickupLocation && order?.deliveryLocation) {
      setRoute([
        [order.pickupLocation.lat, order.pickupLocation.lng],
        [order.deliveryLocation.lat, order.deliveryLocation.lng],
      ]);
    }
  }, [order]);

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-4 p-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-96 w-full" />
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
      <div className="flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Navigation Instructions */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Navigation2 className="h-6 w-6 text-primary-foreground rotate-[-90deg]" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-foreground">250m</div>
              <div className="text-sm text-muted-foreground">Turn left on Elm Street</div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative min-h-[400px]">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <MapView
              center={mapCenter}
              zoom={13}
              markers={markers}
              route={route}
              currentLocation={
                activeLocation
                  ? [activeLocation.lat, activeLocation.lng]
                  : undefined
              }
            />
          </div>
          
          {/* Map Controls */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted">
              <Plus className="h-5 w-5 text-foreground" />
            </button>
            <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted">
              <Minus className="h-5 w-5 text-foreground" />
            </button>
            <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted">
              <Maximize2 className="h-5 w-5 text-foreground" />
            </button>
            <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted">
              <Volume2 className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Location Status */}
        <div className="p-4 pb-2">
          <LocationStatus />
        </div>

        {/* Trip Summary */}
        <div className="bg-card border-t border-border p-4 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-1" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Pickup at {order.restaurantAddress}</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{order.estimatedTime} min</div>
              <div className="text-sm text-muted-foreground">4:15 PM Arrival</div>
            </div>
            <div className="text-sm text-muted-foreground">2.1 km</div>
            <Button
              variant="primary"
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate(ROUTES.ORDERS)}
            >
              End
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
