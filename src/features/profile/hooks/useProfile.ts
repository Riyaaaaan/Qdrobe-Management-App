import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { User } from '@/shared/types';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (data: Partial<User>) => profileService.updateProfile(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
      updateUser(data);
    },
  });
};





