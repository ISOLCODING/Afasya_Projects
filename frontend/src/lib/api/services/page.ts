// src/lib/api/services/page.ts
import apiClient from '../client';

export const getPage = async (slug: string) => {
  console.log(`📄 Fetching page "${slug}"...`);
  try {
    const response = await apiClient.get(`/pages/${slug}`);
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data,
      message: data.message
    };
  } catch (error: any) {
    console.error(`❌ Error fetching page "${slug}":`, error);
    return { 
      success: false, 
      data: null, 
      message: error.message || 'Page not found' 
    };
  }
};

export const getPages = async () => {
  try {
    const response = await apiClient.get('/pages');
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data || [],
      message: data.message
    };
  } catch (error: any) {
    return { success: false, data: [], message: 'Failed to fetch pages' };
  }
};