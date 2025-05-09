import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.token) {
    config.headers.set('Authorization', `Bearer ${session.token}`);
  }

  return config;
});

export { api };
