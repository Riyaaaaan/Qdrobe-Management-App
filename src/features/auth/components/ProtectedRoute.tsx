import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { User } from '@/shared/types';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, setAuth } = useAuthStore();

  // Auto-login with default user if not authenticated
  useEffect(() => {
    if (!user) {
      const defaultUser: User = {
        id: '1',
        name: 'John Driver',
        email: 'driver@example.com',
        phone: '+1234567890',
        vehicleType: 'Bike',
        vehicleNumber: 'DL-01-AB-1234',
        isOnline: true,
      };
      setAuth(defaultUser, 'mock-token');
    }
  }, [user, setAuth]);

  return <>{children}</>;
};

