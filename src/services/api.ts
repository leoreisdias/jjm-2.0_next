import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.backendApi,
});

api.interceptors.request.use((config) => {
  console.log(config);

  return config;
});
