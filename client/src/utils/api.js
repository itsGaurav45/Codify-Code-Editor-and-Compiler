import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || '/api';
const baseURL = rawBaseURL.endsWith('/api')
  ? rawBaseURL
  : `${rawBaseURL.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('codify_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('codify_token');
      localStorage.removeItem('codify_user');
    }

    return Promise.reject(err);
  }
);

export default api;
