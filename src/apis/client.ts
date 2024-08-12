import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const BASE_URL = 'https://api.s-keep.site/api';
const API = axios.create({
  baseURL: BASE_URL,
});

const token =
  'eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoyLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyMzQ0NTAwOCwiZXhwIjoxNzIzNTMxNDA4fQ.UQgWIWOLCVu0OrYqE7Y2iECN0mXah-VvfDnMQ20L6Zoy9tIphRqHVmV2aeaWxlIn60EefvwxSolV3KbqIw4Kww';
API.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${token}`;

    console.log('[axios] ', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export interface BaseResponse<T> {
  success: boolean;
  errorCode: string | null;
  message: string;
  result: T;
}

export const GET = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.get(url, config);
};

export const POST = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.post(url, data, config);
};

export const DELETE = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.delete(url, config);
};

export const PUT = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.put(url, data, config);
};

export const PATCH = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return API.patch(url, data, config);
};
