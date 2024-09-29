/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL


const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// request interceptors
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptors
request.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default request;
