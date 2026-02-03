// src/lib/api/services/blog.ts
import apiClient from '../client';

export const getPosts = async (params: any = {}) => {

  try {
    const response = await apiClient.get('/posts', { params });
    const data = response.data;
    
    if (data.status === 'success') {
      return {
        success: true,
        data: Array.isArray(data.data) ? data.data : (data.data.items || []),
        meta: data.data.meta,
        message: data.message
      };
    }
    
    return { success: false, data: [], message: data.message };
  } catch (error: any) {

    return { success: false, data: [], message: error.message || 'Failed to fetch posts' };
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const response = await apiClient.get(`/posts/${slug}`);
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data,
      message: data.message
    };
  } catch (error: any) {
    return { success: false, data: null, message: error.message || 'Failed to fetch post' };
  }
};