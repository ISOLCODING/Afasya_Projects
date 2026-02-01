import apiClient from '../client';

export const updateProfile = async (data: any) => {
  const response = await apiClient.put('/me', data);
  return response.data;
};

export const updatePassword = async (data: any) => {
  const response = await apiClient.put('/me/password', data);
  return response.data;
};

export const deleteAccount = async () => {
  // Hanya jika benar-benar diperlukan oleh user
  const response = await apiClient.delete('/me');
  localStorage.removeItem('auth_token');
  return response.data;
};
