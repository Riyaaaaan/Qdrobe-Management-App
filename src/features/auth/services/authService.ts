import { LoginCredentials, RegisterData, AuthResponse } from '../types';
import { setAuthToken, setRefreshToken } from '@/services/auth';
import { authData, profileData } from '@/services/mockData';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const user = authData.getUserByEmail(credentials.email);
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }

    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockRefreshToken = 'mock-refresh-token-' + Date.now();
    
    const { password, ...userWithoutPassword } = user;
    
    setAuthToken(mockToken);
    setRefreshToken(mockRefreshToken);
    
    return {
      token: mockToken,
      refreshToken: mockRefreshToken,
      user: userWithoutPassword
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const newUser = authData.createUser(data);
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockRefreshToken = 'mock-refresh-token-' + Date.now();
    
    setAuthToken(mockToken);
    setRefreshToken(mockRefreshToken);
    
    return {
      token: mockToken,
      refreshToken: mockRefreshToken,
      user: newUser
    };
  },

  logout: async (): Promise<void> => {
    // Just clear tokens, no API call needed
    setAuthToken(null);
    setRefreshToken(null);
  },
};





