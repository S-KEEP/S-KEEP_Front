import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';
import useNavigator from '../navigators/hooks/useNavigator';

export const baseURL = 'https://api.s-keep.site';

export const axiosApi = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const Interceptor = ({children}) => {
  const {stackNavigation} = useNavigator();

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
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  interface FailedRequests {
    resolve: (value: AxiosResponse) => void;
    reject: (value: AxiosError) => void;
    config: AxiosRequestConfig;
    error: AxiosError;
  }

  let failedRequests: FailedRequests[] = [];
  let isTokenRefreshing = false;

  // [Reference] https://blog.stackademic.com/refresh-access-token-with-axios-interceptors-in-react-js-with-typescript-bd7a2d035562
  const onRejected = async (error: AxiosError) => {
    console.log('🕷️ Axios Response(onRejected)', error);

    const originalConfig = error.config;

    // 401 Unauthorized 가 아닌 경우, 일반 오류로 처리
    if (error.response?.status !== 401) return Promise.reject(error);

    if (originalConfig) {
      const errorCode = (error.response.data as BaseResponse<string>).errorCode;
      const errorMessage = (error.response.data as BaseResponse<string>)
        .message;
      console.log('🕷️ Axios Error Code', errorCode, errorMessage);

      if (errorCode !== 'REQUEST_14') {
        // 나머지 401 - 스토리지 초기화 및 로그인 화면으로 이동
        console.log('🕷️ 나머지 401 - 스토리지 초기화 및 로그인 화면으로 이동');
        stackNavigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });

        return Promise.reject(error);
      }

      // REQUEST_14 - 만료된 토큰입니다
      console.log('🕷️ REQUEST_14 만료된 토큰입니다');

      if (isTokenRefreshing) {
        console.log('Already Refreshing! (fail request에 추가)');
        return new Promise((resolve, reject) => {
          failedRequests.push({
            resolve,
            reject,
            config: originalConfig,
            error: error,
          });
        });
      }

      try {
        isTokenRefreshing = true;

        console.log('================== REFRESH START ==================');

        const refreshToken = await localStorage.get(TokenKeys.RefreshToken);
        console.log('만료됐슴당~~ 내가 보내는 리프레쉬 토큰', refreshToken);
        const response = await axiosApi.post('/api/auth/jwt/reissue', {
          refreshToken,
        });
        const result = response.data.result;
        console.log('이건 새로운 어쎄스 토큰', result.accessToken);

        await localStorage.set(TokenKeys.AccessToken, result.accessToken);
        const acc: string = await localStorage.get(TokenKeys.AccessToken);
        console.log('이건 새롭게 저장된 어쎼스 토큰', acc);

        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${acc}`;
        originalConfig.headers.Authorization = `Bearer ${acc}`;

        // 실패한 요청들 재요청
        failedRequests.forEach(({resolve, reject, config}) => {
          axiosApi(config)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
      } catch (err) {
        console.log('이것마저 실패');
        failedRequests.forEach(({reject, error}) => reject(error));
        return Promise.reject(error);
      } finally {
        failedRequests = [];
        isTokenRefreshing = false;
        console.log('================== REFRESH END ==================');
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  };

  axiosApi.interceptors.response.use(onFulfilled, onRejected);
  return children;
};

/**
 *  헤더 토큰 추가
 */
axiosApi.interceptors.request.use(
  async config => {
    const accessToken: string = await localStorage.get(TokenKeys.AccessToken);
    console.log('🕷️ Axios Request Intecepter - Access Token', accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
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
