import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://twitmatchplay-server.onrender.com/api/v1',
  withCredentials: true // enable sending cookies with the request,
});

export default apiClient;
