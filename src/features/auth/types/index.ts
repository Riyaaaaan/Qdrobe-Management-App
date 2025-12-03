export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  vehicleType?: string;
  vehicleNumber?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicleType?: string;
    vehicleNumber?: string;
    isOnline: boolean;
    avatar?: string;
  };
}



