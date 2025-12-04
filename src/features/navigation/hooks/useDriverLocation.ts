import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { locationService, DriverLocation, UpdateLocationPayload } from '@/services/locationService';
import { useAuthStore } from '@/features/auth/store/authStore';

export const useDriverLocation = () => {
  const { user } = useAuthStore();
  const driverId = user?.id || '1';

  return useQuery({
    queryKey: ['driverLocation', driverId],
    queryFn: () => locationService.getDriverLocation(driverId),
    refetchInterval: 5000, // Refetch every 5 seconds
    enabled: !!driverId,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useUpdateDriverLocation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const driverId = user?.id || '1';

  return useMutation({
    mutationFn: (location: UpdateLocationPayload) => locationService.updateDriverLocation(location),
    onSuccess: (data) => {
      // Update the cache immediately with optimistic update
      queryClient.setQueryData(['driverLocation', driverId], data);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['orderLocation'] });
    },
    onError: (error) => {
      console.error('Failed to update driver location:', error);
    },
  });
};



