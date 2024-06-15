import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://twitmatchplay-server.onrender.com/api/v1';

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true // enable sending cookies with the request
});

export default apiClient;
