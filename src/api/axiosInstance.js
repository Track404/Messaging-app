import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://messaging-app-backend-production-155b.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
