import api from './api';
import { ENDPOINTS } from './endpoints';

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
    const response = await api.post<DriverLocation>(ENDPOINTS.LOCATION.UPDATE_DRIVER, location);
    return response.data;
  },

  getDriverLocation: async (driverId: string): Promise<DriverLocation> => {
    const response = await api.get<DriverLocation>(ENDPOINTS.LOCATION.GET_DRIVER(driverId));
    return response.data;
  },

  getOrderLocation: async (orderId: string): Promise<DriverLocation | null> => {
    const response = await api.get<DriverLocation | null>(ENDPOINTS.LOCATION.GET_ORDER(orderId));
    return response.data;
  },
};

