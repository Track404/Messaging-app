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

export const postMessageChat = async ({ data, chatId, userId }) => {
  try {
    const response = await axiosInstance.post(
      `/messageChat/${chatId}/${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export const createChat = async ({ data }) => {
  try {
    const response = await axiosInstance.post(`/chat/`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};
