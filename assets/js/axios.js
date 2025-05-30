// axios.js - Centralized Axios instance with theme-based error/success handling
import axios from 'axios';

const instance = axios.create({
  baseURL: '/wp-json/schoolms/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for global error/success notification styling
instance.interceptors.response.use(
  response => response,
  error => {
    // Optionally trigger a global error notification here
    // window.dispatchEvent(new CustomEvent('schoolms:error', { detail: error }));
    return Promise.reject(error);
  }
);

export default instance;
