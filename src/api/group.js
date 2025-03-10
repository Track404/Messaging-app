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

export const postMessageGroup = async ({ data, chatId, userId }) => {
  try {
    const response = await axiosInstance.post(
      `/messageGroup/${chatId}/${userId}`,
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
