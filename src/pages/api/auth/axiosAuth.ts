// axios.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.apiUrl,
});

api.interceptors.request.use(
  config => {
    // Add JWT to request headers
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
