import axiosInstance from './axiosInstance';

export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/users/sign_in', credentials);
  return response.data;
};
