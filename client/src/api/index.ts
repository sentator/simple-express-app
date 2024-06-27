import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const defaultApi = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

defaultApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'accessToken',
  )}`;

  return config;
});

export default defaultApi;
