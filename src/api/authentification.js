import axiosInstance from './axiosInstance';

export const LoginUser = async ({ data }) => {
  try {
    const response = await axiosInstance.post(`/login`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export const SecureRoute = async () => {
  try {
    const token = localStorage.getItem('token'); // Ensure token is retrieved

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axiosInstance.get(`/protected`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in headers
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};
