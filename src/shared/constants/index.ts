export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const ORDER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  PICKED: 'picked',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.ACCEPTED]: 'Accepted',
  [ORDER_STATUS.PICKED]: 'Picked Up',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ORDERS: '/orders',
  ORDER_DETAILS: '/orders/:id',
  EARNINGS: '/earnings',
  PROFILE: '/profile',
  NAVIGATION: '/navigation/:orderId',
} as const;



