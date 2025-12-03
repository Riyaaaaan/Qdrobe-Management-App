import api from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';
import { LoginCredentials, RegisterData, AuthResponse } from '../types';
import { setAuthToken, setRefreshToken } from '@/services/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
    const { token, refreshToken } = response.data;
    setAuthToken(token);
    setRefreshToken(refreshToken);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
    const { token, refreshToken } = response.data;
    setAuthToken(token);
    setRefreshToken(refreshToken);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
};



