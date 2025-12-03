import api from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';
import { Order } from '@/shared/types';

export const orderService = {
  getOrders: async (status?: string): Promise<Order[]> => {
    const params = status ? { status } : {};
    const response = await api.get<Order[] | { orders: Order[] } | Order>(ENDPOINTS.ORDERS.LIST, { params });
    
    // Handle different response formats
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }
    if (data && typeof data === 'object' && 'orders' in data && Array.isArray((data as any).orders)) {
      return (data as any).orders;
    }
    // Fallback to empty array
    return [];
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(ENDPOINTS.ORDERS.DETAIL(id));
    return response.data;
  },

  acceptOrder: async (id: string): Promise<Order> => {
    const response = await api.patch<Order>(ENDPOINTS.ORDERS.ACCEPT(id));
    return response.data;
  },

  rejectOrder: async (id: string): Promise<Order> => {
    const response = await api.patch<Order>(ENDPOINTS.ORDERS.REJECT(id));
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string): Promise<Order> => {
    const response = await api.patch<Order>(ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status });
    return response.data;
  },
};

