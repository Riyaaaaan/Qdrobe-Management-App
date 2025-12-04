import { useQuery } from '@tanstack/react-query';
import { locationService, DriverLocation } from '@/services/locationService';

export const useOrderLocation = (orderId: string | undefined) => {
  return useQuery<DriverLocation | null>({
    queryKey: ['orderLocation', orderId],
    queryFn: () => {
      if (!orderId) return null;
      return locationService.getOrderLocation(orderId);
    },
    refetchInterval: 5000, // Refetch every 5 seconds for real-time tracking
    enabled: !!orderId,
    retry: 2,
    retryDelay: 1000,
    staleTime: 3000, // Consider data stale after 3 seconds
  });
};



