import axios, {AxiosError, AxiosResponse} from 'axios';

export const baseURL = 'https://api.s-keep.site';

export const axiosApi = axios.create({
  baseURL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
