import axios, {AxiosError, AxiosResponse} from 'axios';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';

export const baseURL = 'https://api.s-keep.site';

export const axiosApi = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 *  헤더 토큰 추가
 */
axiosApi.interceptors.request.use(
  async config => {
    const accessToken: string = await localStorage.get(TokenKeys.AccessToken);
    console.log(accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

/**
 *  Response Interceptor (응답 인터셉터)
 *  1. onFulfilled
 *  2. onRejected
 */
const onFulfilled = (res: AxiosResponse) => {
  return res;
};

const onRejected = async (error: AxiosError) => {
  const originalConfig = error.config;

  const refreshToken = (await localStorage.get(
    TokenKeys.RefreshToken,
  )) as string;

  const statusArray = [4100, 4101, 4102, 4103, 4104];

  if (originalConfig && statusArray.includes(error.response?.status || 0)) {
    try {
      const response = await axiosApi.post('/api/auth/jwt/reissue', {
        refreshToken,
      });
      const {result} = response.data.result;

      localStorage.set(TokenKeys.AccessToken, result.accessToken);
      localStorage.set(TokenKeys.RefreshToken, result.refreshToken);

      originalConfig.headers.Authorization = `Bearer ${result.accessToken}`;

      return axiosApi(originalConfig);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return Promise.reject(error);
};

axiosApi.interceptors.response.use(onFulfilled, onRejected);
