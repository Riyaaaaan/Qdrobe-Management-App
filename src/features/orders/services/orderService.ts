import { Order } from '@/shared/types';
import { orderData } from '@/services/mockData';

export const orderService = {
  getOrders: async (status?: string): Promise<Order[]> => {
    return Promise.resolve(orderData.getOrders(status));
  },

  getOrder: async (id: string): Promise<Order> => {
    const order = orderData.getOrder(id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    return Promise.resolve(order);
  },

  acceptOrder: async (id: string): Promise<Order> => {
    return Promise.resolve(orderData.acceptOrder(id));
  },

  rejectOrder: async (id: string): Promise<Order> => {
    return Promise.resolve(orderData.rejectOrder(id));
  },

  updateOrderStatus: async (id: string, status: string): Promise<Order> => {
    return Promise.resolve(orderData.updateOrderStatus(id, status as Order['status']));
  },
};

