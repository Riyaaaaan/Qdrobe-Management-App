import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';
import { Order } from '@/shared/types';
import { ORDER_STATUS } from '@/shared/constants';

export const useOrders = (status?: string) => {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: async () => {
      const data = await orderService.getOrders(status);
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    initialData: [], // Provide initial empty array
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });
};

export const useAcceptOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.acceptOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useRejectOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.rejectOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderService.updateOrderStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });
};

