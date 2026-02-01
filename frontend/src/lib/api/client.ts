// src/lib/api/client.ts
import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface ApiError {
  status: string;
  message: string;
  type: string;
  errors?: Record<string, string[]>;
}

// Pastikan environment variable benar
// Gunakan relative path agar request melewati Vite Proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

console.log('🌐 API Base URL:', API_BASE_URL);

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ API Response ${response.status}: ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ API Error Details:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    const errorResponse: ApiError = {
      status: 'error',
      message: 'Terjadi kesalahan yang tidak terduga.',
      type: 'unknown'
    };

    if (error.code === 'ECONNABORTED') {
      errorResponse.message = 'Timeout: Server tidak merespon.';
      errorResponse.type = 'timeout';
    } else if (!error.response) {
      errorResponse.message = `Tidak dapat terhubung ke server: ${API_BASE_URL}`;
      errorResponse.type = 'network';
    } else if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;

      if (status === 401) {
        localStorage.removeItem('auth_token');
        errorResponse.message = 'Sesi telah berakhir.';
        errorResponse.type = 'unauthorized';
      } else if (status === 404) {
        errorResponse.message = 'Data tidak ditemukan.';
        errorResponse.type = 'not_found';
      } else if (status === 422) {
        errorResponse.message = data.message || 'Data tidak valid.';
        errorResponse.errors = data.errors;
        errorResponse.type = 'validation';
      } else if (status >= 500) {
        errorResponse.message = 'Kesalahan server.';
        errorResponse.type = 'server';
      } else {
        errorResponse.message = data?.message || errorResponse.message;
      }
    }

    return Promise.reject(errorResponse);
  }
);

export default apiClient;