// src/lib/api/services/team.ts
import apiClient from '../client';

export const getTeam = async () => {

  try {
    const response = await apiClient.get('/team');
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data || [],
      message: data.message
    };
  } catch (error: any) {

    return { success: false, data: [], message: error.message || 'Failed to fetch team' };
  }
};