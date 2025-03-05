import axiosInstance from './axiosInstance';

export const postUser = async ({ data }) => {
  try {
    const response = await axiosInstance.post(`/user`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};
