// src/lib/api/services/team.ts
import apiClient from '../client';

export const getTeam = async (params: any = {}) => {
  try {
    const response = await apiClient.get('/team', { params });
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data || [],
      message: data.message
    };
  } catch (error: any) {
    console.error('❌ Error fetching team:', error);
    return { success: false, data: [], message: error.message || 'Failed to fetch team' };
  }
};