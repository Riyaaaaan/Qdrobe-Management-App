export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    ACCEPT: (id: string) => `/orders/${id}/accept`,
    REJECT: (id: string) => `/orders/${id}/reject`,
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },
  EARNINGS: {
    LIST: '/earnings',
    SUMMARY: '/earnings/summary',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    UPLOAD_DOCUMENT: '/profile/documents',
  },
  LOCATION: {
    UPDATE_DRIVER: '/location/driver',
    GET_DRIVER: (driverId: string) => `/location/driver/${driverId}`,
    GET_ORDER: (orderId: string) => `/location/order/${orderId}`,
  },
} as const;



