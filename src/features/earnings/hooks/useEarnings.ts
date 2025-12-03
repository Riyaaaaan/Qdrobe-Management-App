import { useQuery } from '@tanstack/react-query';
import { earningsService } from '../services/earningsService';

export const useEarnings = () => {
  return useQuery({
    queryKey: ['earnings'],
    queryFn: async () => {
      const data = await earningsService.getEarnings();
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
    initialData: [], // Provide initial empty array
  });
};

export const useEarningsSummary = () => {
  return useQuery({
    queryKey: ['earnings', 'summary'],
    queryFn: () => earningsService.getEarningsSummary(),
  });
};

