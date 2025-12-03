export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType?: string;
  vehicleNumber?: string;
  isOnline: boolean;
  avatar?: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  restaurantName: string;
  restaurantAddress: string;
  deliveryAddress: string;
  pickupLocation: Location;
  deliveryLocation: Location;
  status: 'pending' | 'accepted' | 'picked' | 'delivered' | 'cancelled';
  totalAmount: number;
  deliveryFee: number;
  items: OrderItem[];
  estimatedTime: number; // in minutes
  createdAt: string;
  acceptedAt?: string;
  pickedAt?: string;
  deliveredAt?: string;
  driverId?: string;
  notes?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Earnings {
  id: string;
  date: string;
  totalEarnings: number;
  deliveryCount: number;
  orders: Order[];
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}



