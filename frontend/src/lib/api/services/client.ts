import apiClient from '../client';

export const getClients = async () => {
  const response = await apiClient.get('/clients');
  return response.data;
};
