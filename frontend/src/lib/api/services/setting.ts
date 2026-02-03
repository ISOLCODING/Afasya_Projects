// src/lib/api/services/setting.ts
import apiClient from '../client';

export const getSettings = async () => {
  try {
    const response = await apiClient.get('/settings');
    const data = response.data;
    
    if (data.status === 'success') {
      return {
        success: true,
        data: data.data,
        message: data.message
      };
    }
    
    throw new Error(data.message || 'Failed to fetch settings');
  } catch (error: any) {
    return { 
      success: false, 
      data: null,
      message: error.message || 'Failed to fetch settings'
    };
  }
};