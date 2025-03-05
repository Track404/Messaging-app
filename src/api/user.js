import axiosInstance from './axiosInstance';

export const postUser = async ({ data }) => {
  try {
    const response = await axiosInstance.post(`/user`, data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
