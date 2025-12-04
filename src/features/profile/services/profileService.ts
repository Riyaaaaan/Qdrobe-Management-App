import { User } from '@/shared/types';
import { profileData } from '@/services/mockData';

export const profileService = {
  getProfile: async (): Promise<User> => {
    return profileData.getProfile();
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return profileData.updateProfile(data);
  },
};





