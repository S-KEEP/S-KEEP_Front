import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
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

export const handleApiError = async (
  error: AxiosError,
  onLogout: () => void,
) => {
  console.error('리프레시 요청이 실패했습니다:', error);

  if (error.response?.status === 401) {
    // 호출된 콜백 함수를 통해 로그아웃 처리해줘야되는데 일단 보류 시켜보겠습니다.. ㅠ
  }
};
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
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
    return Promise.reject(error);
  }

  if (originalConfig && error.response?.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshToken = await localStorage.get(TokenKeys.RefreshToken);
        console.log('만료됐슴당~~ 내가 보내는 리프레쉬 토큰', refreshToken);

        // 리프레시 토큰을 이용한 요청 전 디버깅 로그 추가
        console.log('리프레시 요청을 보냅니다');

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
          // handleApiError에 handleLogout 콜백을 전달
          //  await handleApiError(err, handleLogout);
        } else {
          console.error('예상치 못한 오류 발생:', err);
        }
      } finally {
        console.log('리프레시 요청 후, finally 블록 실행');
        isRefreshing = false;
      }
    } else {
      console.log(
        '401 에러 발생: 요청이 실패했습니다. 리프레시 토큰이 이미 갱신 중입니다.',
        error,
      );

      return new Promise(function (resolve, reject) {
        console.log('리프레쉬 토큰 만료라면 마지막 호출');
        failedQueue.push({resolve, reject});
      })
        .then(token => {
          originalConfig.headers.Authorization = 'Bearer ' + token;
          return axiosApi(originalConfig);
        })
        .catch(err => {
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
