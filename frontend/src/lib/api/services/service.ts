// src/lib/api/services/service.ts
import apiClient from '../client';

export const getServices = async () => {
  try {
    const response = await apiClient.get('/services');
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data || [],
      message: data.message
    };
  } catch (error: any) {
    console.error('❌ Error fetching services:', error);
    return { success: false, data: [], message: error.message || 'Failed to fetch services' };
  }
};

export const getServiceBySlug = async (slug: string) => {
  try {
    const response = await apiClient.get(`/services/${slug}`);
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data,
      message: data.message
    };
  } catch (error: any) {
    return { success: false, data: null, message: error.message || 'Failed to fetch service' };
  }
};