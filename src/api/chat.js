import axiosInstance from './axiosInstance';

export const getChatDetails = async (id) => {
  try {
    if (!id) throw new Error('Missing Id');
    const response = await axiosInstance.get(`chat/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
