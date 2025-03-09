import axiosInstance from './axiosInstance';

export const getGroupDetails = async (id) => {
  try {
    if (!id) throw new Error('Missing Id');
    const response = await axiosInstance.get(`group/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
