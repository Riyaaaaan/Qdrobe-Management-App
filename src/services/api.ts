import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/shared/constants';
import { getAuthToken, removeAuthToken } from './auth';
import { ApiError } from '@/shared/types';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      window.location.href = '/login';
    }

    const apiError: ApiError = {
      message: (error.response?.data as any)?.message || error.message || 'An error occurred',
      status: error.response?.status,
      errors: (error.response?.data as any)?.errors,
    };

    return Promise.reject(apiError);
  }
);

export default api;



