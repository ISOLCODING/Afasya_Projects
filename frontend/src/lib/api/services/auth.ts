import apiClient from '../client';

export const login = async (data: any) => {
  const response = await apiClient.post('/login', {
    ...data,
    device_name: 'webapp',
  });
  if (response.data.data.token) {
    localStorage.setItem('auth_token', response.data.data.token);
  }
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post('/logout');
  localStorage.removeItem('auth_token');
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get('/me');
  return response.data;
};
