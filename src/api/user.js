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

export const getUserChats = async ({ queryKey }) => {
  try {
    const [, userToken] = queryKey;
    if (!userToken) throw new Error('Missing mapId');
    const response = await axiosInstance.get(`/user/chats/${userToken}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
