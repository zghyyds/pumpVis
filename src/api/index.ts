import request from './request';
const API_URL = import.meta.env.VITE_API_URL

export const statisticsUser = async () =>{
  return request.post(`${API_URL}/statistics/user`)
}

export const luckyPackagePopup = async () =>{
  return request.post(`${API_URL}/statistics/luckyPackagePopup`)
}

export const statisticslogin = async () =>{
  return request.post(`${API_URL}/statistics/login`)
}

export const statisticlottery = async () =>{
  return request.post(`${API_URL}/statistics/lottery`)
}

export const deviceStatistics = async () =>{
  return request.post(`${API_URL}/statistics/device_statistics`)
}

export const statisticsPage = async () => {
  return request.post(`${API_URL}/statistics/first_page`)
}

export const statisticsIp = async () => {
  return request.post(`${API_URL}/statistics/ip`)
}

