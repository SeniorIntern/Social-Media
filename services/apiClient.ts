import axios from 'axios';
import { getCookie } from 'cookies-next';

const token = getCookie('session');

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default apiClient;
