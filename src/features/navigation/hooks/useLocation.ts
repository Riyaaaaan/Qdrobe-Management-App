import { useState, useEffect, useRef } from 'react';
import { useUpdateDriverLocation } from './useDriverLocation';
import { useAuthStore } from '@/features/auth/store/authStore';

interface Location {
  lat: number;
  lng: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const updateLocationMutation = useUpdateDriverLocation();
  const lastSyncTime = useRef<number>(0);
  const SYNC_INTERVAL = 10000; // Sync every 10 seconds

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading ?? undefined,
          speed: position.coords.speed ?? undefined,
        };
        
        setLocation(newLocation);
        setError(null);
        setLoading(false);

        // Auto-sync location to server if driver is online
        const now = Date.now();
        if (user?.isOnline && now - lastSyncTime.current >= SYNC_INTERVAL) {
          lastSyncTime.current = now;
          updateLocationMutation.mutate({
            lat: newLocation.lat,
            lng: newLocation.lng,
            accuracy: newLocation.accuracy,
            heading: newLocation.heading,
            speed: newLocation.speed,
          });
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [user?.isOnline, updateLocationMutation]);

  return { location, error, loading };
};



