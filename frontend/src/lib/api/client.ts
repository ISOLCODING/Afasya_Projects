// src/lib/api/client.ts
import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface ApiError {
  status: string;
  message: string;
  type: string;
  errors?: Record<string, string[]>;
}

// Gunakan proxy di development
const API_BASE_URL = import.meta.env.MODE === 'development' 
  ? '/api/v1'  // Proxy ke backend Laravel (URL harus sesuai update prefix v1 di api.php)
  : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

console.log('🌐 API Base URL:', API_BASE_URL);

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Penting untuk session/cookie
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Tambah timestamp untuk cache busting di development
    if (import.meta.env.DEV) {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const errorResponse: ApiError = {
      status: 'error',
      message: 'Terjadi kesalahan yang tidak terduga.',
      type: 'unknown'
    };

    if (error.code === 'ECONNABORTED') {
      errorResponse.message = 'Timeout: Server tidak merespon.';
      errorResponse.type = 'timeout';
    } else if (!error.response) {
      errorResponse.message = 'Tidak dapat terhubung ke server.';
      errorResponse.type = 'network';
    } else if (error.response.status === 401) {
      localStorage.removeItem('auth_token');
      errorResponse.message = 'Sesi telah berakhir.';
      errorResponse.type = 'unauthorized';
    } else if (error.response.status === 404) {
      errorResponse.message = 'Data tidak ditemukan.';
      errorResponse.type = 'not_found';
    } else if (error.response.status === 422) {
      const data = error.response.data as any;
      errorResponse.message = data.message || 'Data tidak valid.';
      errorResponse.errors = data.errors;
      errorResponse.type = 'validation';
    } else if (error.response.status >= 500) {
      errorResponse.message = 'Kesalahan server.';
      errorResponse.type = 'server';
    }

    return Promise.reject(errorResponse);
  }
);

export default apiClient;