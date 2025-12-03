import { useAuthStore } from '../store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { LoginCredentials, RegisterData } from '../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { User } from '@/shared/types';

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, logout: logoutStore, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user as User, data.token);
      queryClient.invalidateQueries();
      navigate(ROUTES.DASHBOARD);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      setAuth(data.user as User, data.token);
      queryClient.invalidateQueries();
      navigate(ROUTES.DASHBOARD);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: () => logoutMutation.mutate(),
    isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
    error: loginMutation.error || registerMutation.error,
    updateUser,
  };
};

