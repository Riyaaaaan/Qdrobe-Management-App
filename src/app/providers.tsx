import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InstallPrompt } from '@/shared/components/InstallPrompt';
import { Toaster } from '@/shared/components/ui/toaster';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <InstallPrompt />
      <Toaster />
    </QueryClientProvider>
  );
};
