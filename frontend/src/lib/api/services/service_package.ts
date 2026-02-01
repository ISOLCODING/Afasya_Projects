// src/lib/api/services/service_package.ts
import apiClient from '../client';

export interface ServicePackage {
  id: number;
  package_name: string;
  price: number;
  description: string;
  included_features: string[] | string;
  excluded_features: string[] | string;
  delivery_days: number;
  is_popular: boolean;
}

export const getServicePackages = async (ids?: number[]) => {
  try {
    const params = ids ? { ids: ids.join(',') } : {};
    const response = await apiClient.get('/service-packages', { params });
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data || [],
      message: data.message
    };
  } catch (error: any) {
    return { success: false, data: [], message: error.message || 'Failed to fetch packages' };
  }
};
