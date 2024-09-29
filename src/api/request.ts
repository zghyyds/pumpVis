/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
const API_URL = import.meta.env.VITE_API_URL

interface CustomAxiosInstance extends AxiosInstance {
  <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
  <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
}

const request: CustomAxiosInstance = axios.create({
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
