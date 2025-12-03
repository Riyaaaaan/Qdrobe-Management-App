import { create } from 'zustand';
import { Order } from '@/shared/types';

interface OrderState {
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  activeOrders: Order[];
  setActiveOrders: (orders: Order[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  selectedOrder: null,
  setSelectedOrder: (order) => set({ selectedOrder: order }),
  activeOrders: [],
  setActiveOrders: (orders) => set({ activeOrders: orders }),
}));



