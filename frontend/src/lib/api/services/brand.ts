// src/lib/api/services/brand.ts
import apiClient from '../client';

export interface Brand {
  id: number;
  name: string;
  description?: string;
  logo_url: string;
  website_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const getBrands = async () => {
  try {
    const response = await apiClient.get('/brands');
    const data = response.data;
    return {
      success: data.status === 'success',
      data: (data.data as Brand[]) || [],
      message: data.message
    };
  } catch (error: any) {
    console.error('❌ Error fetching brands:', error);
    return { success: false, data: [], message: error.message || 'Failed to fetch brands' };
  }
};
