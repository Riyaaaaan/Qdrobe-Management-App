import { locationData } from './mockData';

export interface DriverLocation {
  driverId: string;
  lat: number;
  lng: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
  timestamp: string;
}

export interface UpdateLocationPayload {
  lat: number;
  lng: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
}

export const locationService = {
  updateDriverLocation: async (location: UpdateLocationPayload): Promise<DriverLocation> => {
    const driverId = "1"; // In real app, get from auth context
    return locationData.updateDriverLocation(driverId, location);
  },

  getDriverLocation: async (driverId: string): Promise<DriverLocation> => {
    return locationData.getDriverLocation(driverId);
  },

  getOrderLocation: async (orderId: string): Promise<DriverLocation | null> => {
    return locationData.getOrderLocation(orderId);
  },
};



