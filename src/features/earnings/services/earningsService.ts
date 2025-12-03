import api from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';
import { Earnings } from '@/shared/types';

export const earningsService = {
  getEarnings: async (): Promise<Earnings[]> => {
    const response = await api.get<Earnings[] | { earnings: Earnings[] } | Earnings>(ENDPOINTS.EARNINGS.LIST);
    
    // Handle different response formats
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }
    if (data && typeof data === 'object' && 'earnings' in data && Array.isArray((data as any).earnings)) {
      return (data as any).earnings;
    }
    // Fallback to empty array
    return [];
  },

  getEarningsSummary: async (): Promise<{
    totalEarnings: number;
    totalDeliveries: number;
    averageEarnings: number;
  }> => {
    const response = await api.get(ENDPOINTS.EARNINGS.SUMMARY);
    return response.data;
  },
};

