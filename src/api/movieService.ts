// src/api/movieService.ts - CON API KEY REAL
import axios from 'axios';
import { MovieResponse } from './movies';

const API_KEY = '1f6804a0a3c691263e62fa9a527fa76a'; // Tu API Key real
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'es-ES',
  },
});

export const getPopularMovies = async (): Promise<MovieResponse> => {
  const response = await api.get('/movie/popular');
  return response.data;
};

export const getNowPlayingMovies = async (): Promise<MovieResponse> => {
  const response = await api.get('/movie/now_playing');
  return response.data;
};

export const getTopRatedMovies = async (): Promise<MovieResponse> => {
  const response = await api.get('/movie/top_rated');
  return response.data;
};

export const getUpcomingMovies = async (): Promise<MovieResponse> => {
  const response = await api.get('/movie/upcoming');
  return response.data;
};