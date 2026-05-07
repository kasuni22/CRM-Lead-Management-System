import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://crm-lead-management-system-fbe4.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const getAuthToken = () => localStorage.getItem('token');

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    const apiMessage =
      error?.response?.data?.message ||
      error?.message ||
      'An unexpected error occurred while communicating with the API.';

    return Promise.reject({
      ...error,
      message: apiMessage,
    });
  }
);

export default api;
