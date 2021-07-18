import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.BACKEND_API,
  // baseURL: 'http://localhost:3333',
});

api.interceptors.request.use((config) => {
  console.log(config);

  return config;
});
