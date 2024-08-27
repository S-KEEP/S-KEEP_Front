import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'https://api.s-keep.site';

export const axiosApi = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const logoutUser = async () => {
  try {
    await AsyncStorage.clear();
    // .navigate('Login');
    console.log('로그아웃 성공 이제 이동을 시켜주세요');
  } catch (error) {
    console.log('로그아웃 실패', error);
  }
};
/**
 *  헤더 토큰 추가
 */
axiosApi.interceptors.request.use(
  async config => {
    const accessToken: string = await localStorage.get(TokenKeys.AccessToken);

    console.log('어쎄스 토큰 : ', accessToken);
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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  console.log('shit6');
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const onRejected = async (error: AxiosError) => {
  const originalConfig = error.config;

  if (error.response?.status === 500) {
    console.log('shit33');
    logoutUser();
    return Promise.reject(error);
  }

  if (originalConfig && error.response?.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshToken = await localStorage.get(TokenKeys.RefreshToken);
        console.log('만료됐슴당~~ 내가 보내는 리프레쉬 토큰', refreshToken);

        const response = await axiosApi.post('/api/auth/jwt/reissue', {
          refreshToken,
        });
        console.log('리프레시 요청 성공! 상태 코드:', response.status);

        if (response.status !== 200) {
          throw new Error(`Unexpected status code: ${response.status}`);
        }

        console.log('Response Data:', response.data);

        const result = response.data.result;
        console.log('이건 새로운 어쎄스 토큰', result.accessToken);

        await localStorage.set(TokenKeys.AccessToken, result.accessToken);
        const acc: string = await localStorage.get(TokenKeys.AccessToken);
        console.log('이건 새롭게 저장된 어쎼스 토큰', acc);

        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${acc}`;
        originalConfig.headers.Authorization = `Bearer ${acc}`;

        processQueue(null, result.accessToken);

        return axiosApi(originalConfig);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.log('현재 발생한 오류는 ', err);
        } else {
          console.error('예상치 못한 오류 발생:', err);
        }
      } finally {
        console.log('리프레시 요청 후, finally 블록 실행');
        isRefreshing = false;
        //logoutUser();
      }
    } else {
      console.log(
        '401 에러 발생: 요청이 실패했습니다. 리프레시 토큰이 이미 갱신 중입니다.',
        error,
      );

      return new Promise(function (resolve, reject) {
        console.log('shit1');
        failedQueue.push({resolve, reject});
      })
        .then(token => {
          console.log('shit2');
          originalConfig.headers.Authorization = 'Bearer ' + token;
          return axiosApi(originalConfig);
        })
        .catch(err => {
          console.log('shit3 에러는 : ', err);
          return Promise.reject(err);
        });
    }
  }

  return Promise.reject(error);
};

axiosApi.interceptors.response.use(onFulfilled, onRejected);

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
  return axiosApi.get(url, config);
};

export const POST = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return axiosApi.post(url, data, config);
};

export const DELETE = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return axiosApi.delete(url, config);
};

export const PUT = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return axiosApi.put(url, data, config);
};

export const PATCH = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  return axiosApi.patch(url, data, config);
};
