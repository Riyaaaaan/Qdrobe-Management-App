import { Earnings } from '@/shared/types';
import { earningsData } from '@/services/mockData';

export const earningsService = {
  getEarnings: async (): Promise<Earnings[]> => {
    return earningsData.getEarnings();
  },

  getEarningsSummary: async (): Promise<{
    totalEarnings: number;
    totalDeliveries: number;
    averageEarnings: number;
  }> => {
    return earningsData.getEarningsSummary();
  },
};

