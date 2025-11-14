import axios from 'axios';
import { API_URL } from '../api/constants';

const tmdb = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔧 Interceptor de respuestas (opcional)
tmdb.interceptors.response.use(
  response => response,
  error => {
    console.error('Error TMDB API:', error);
    return Promise.reject(error);
  }
);

export default tmdb;
