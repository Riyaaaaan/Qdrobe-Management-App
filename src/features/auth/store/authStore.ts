import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/shared/types';
import { STORAGE_KEYS } from '@/shared/constants';
import { setAuthToken, setRefreshToken, removeAuthToken } from '@/services/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token, refreshToken) => {
        setAuthToken(token);
        if (refreshToken) {
          setRefreshToken(refreshToken);
        }
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        removeAuthToken();
        set({ user: null, token: null, isAuthenticated: false });
      },
      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);




