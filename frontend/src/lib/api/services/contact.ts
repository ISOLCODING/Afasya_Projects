import apiClient from '../client';

export const sendContactMessage = async (data: any) => {
  const response = await apiClient.post('/contact', data);
  return response.data;
};

export const subscribeNewsletter = async (email: string) => {
  const response = await apiClient.post('/subscribe', { email });
  return response.data;
};
