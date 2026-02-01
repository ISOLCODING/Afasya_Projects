// src/lib/api/services/portfolio.ts
import apiClient from '../client';

export const getPortfolios = async (params: any = {}) => {
  console.log('🎨 Fetching portfolios...', params);
  try {
    const response = await apiClient.get('/portfolios', { params });
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data || [],
      message: data.message
    };
  } catch (error: any) {
    console.error('❌ Error fetching portfolios:', error);
    return { success: false, data: [], message: error.message || 'Failed to fetch portfolios' };
  }
};

export const getPortfolioBySlug = async (slug: string) => {
  try {
    const response = await apiClient.get(`/portfolios/${slug}`);
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data,
      message: data.message
    };
  } catch (error: any) {
    return { success: false, data: null, message: error.message || 'Failed to fetch portfolio' };
  }
};