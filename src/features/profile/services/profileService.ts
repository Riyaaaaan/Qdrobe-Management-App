import api from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';
import { User } from '@/shared/types';

export const profileService = {
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>(ENDPOINTS.PROFILE.GET);
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(ENDPOINTS.PROFILE.UPDATE, data);
    return response.data;
  },
};



