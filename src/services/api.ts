import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.backendApi,
  // baseURL: 'http://localhost:3333',
});

api.interceptors.request.use((config) => {
  console.log(config);

  return config;
});
