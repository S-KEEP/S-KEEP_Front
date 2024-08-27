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

  const onRejected = async (error: AxiosError) => {
    console.log('AxiosError', error);
    const originalConfig = error.config;
    if (error.response?.status === 500) {
      return Promise.reject(error);
    }

    if (originalConfig && error.response?.status === 401) {
      const errorCode = (error.response.data as BaseResponse<string>).errorCode;
      const errorMessage = (error.response.data as BaseResponse<string>)
        .message;
      console.log('errorCode', errorCode, errorMessage);

      if (errorCode === 'REQUEST_003' || errorCode === 'REQUEST_14') {
        // REQUEST_003 - 유효하지 않은 JWT입니다.
        // 리프레시 로직 수행

        if (!isRefreshing) {
          isRefreshing = true;

          try {
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

            //리프레쉬 토큰조차 만료되면 로그인 화면으로 ->

            axiosApi.defaults.headers.common['Authorization'] = `Bearer ${acc}`;
            originalConfig.headers.Authorization = `Bearer ${acc}`;

            processQueue(null, result.accessToken);

            return axiosApi(originalConfig);
          } catch (err) {
            processQueue(err, null);
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        } else {
          return new Promise(function (resolve, reject) {
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
      } else {
        // 나머지 401 - 로그인 화면으로 이동
        // console.log('로그인 화면으로 이동');
        stackNavigation.navigate('Login');
      }
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
    console.log('어쎄스 토큰 : ', accessToken);

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
