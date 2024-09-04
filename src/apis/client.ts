import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';
import useNavigator from '../navigators/hooks/useNavigator';
import {useSetRecoilState} from 'recoil';
import {authState} from '../libs/recoil/states/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InterceptorProps} from '../types/token';

export const baseURL = 'https://api.s-keep.site';

export const axiosApi = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * resetToLoginIfNeeded
 * 토큰 관련 로직 실패 시, 전부 지우고 로그인 화면으로 이동
 * @param stackNavigation
 * @param setAuth
 */
async function resetToLoginIfNeeded(
  stackNavigation: any,
  setAuth: (value: {isAuthenticated: boolean}) => void,
) {
  setAuth({isAuthenticated: false});
  await AsyncStorage.clear();

  if (stackNavigation && stackNavigation.isReady()) {
    const currentRouteName = stackNavigation.getCurrentRoute()?.name;
    if (currentRouteName !== 'Login') {
      stackNavigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  } else {
    console.log("The 'navigation' object hasn't been initialized yet. ");
  }
}

export const Interceptor = ({children}: InterceptorProps) => {
  const {stackNavigation} = useNavigator();
  const setAuth = useSetRecoilState(authState);
  /**
   *  Response Interceptor (응답 인터셉터)
   *  1. onFulfilled
   *  2. onRejected
   */
  const onFulfilled = (res: AxiosResponse) => {
    return res;
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
    //console.log('🕷️ Axios Response(onRejected)', error);

    const originalConfig = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalConfig) {
      const errorCode = (error.response.data as BaseResponse<string>).errorCode;
      const errorMessage = (error.response.data as BaseResponse<string>)
        .message;
      console.log('🕷️ Axios Error Code', errorCode, errorMessage);

      if (errorCode !== 'REQUEST_14') {
        console.log('🕷️ 나머지 401 - 스토리지 초기화 및 로그인 화면으로 이동');
        await resetToLoginIfNeeded(stackNavigation, setAuth);

        return Promise.reject(error);
      }

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
        console.log('만료 : 내가 보내는 리프레쉬 토큰', refreshToken);

        const response = await axiosApi.post('/api/auth/jwt/reissue', {
          refreshToken,
        });

        const result = response.data.result;
        console.log('new acceess Token : ', result.accessToken);

        await localStorage.set(TokenKeys.AccessToken, result.accessToken);
        const acc: string = await localStorage.get(TokenKeys.AccessToken);

        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${acc}`;
        originalConfig.headers.Authorization = `Bearer ${acc}`;

        // 새 토큰으로 실패한 모든 요청 해결
        failedRequests.forEach(({resolve, reject, config}) => {
          axiosApi(config)
            .then(response => resolve(response))
            .catch(err => reject(err));
        });

        // 큐 클리어
        failedRequests = [];

        // 처음 리퀘스트 재시도
        return axiosApi(originalConfig);
      } catch (err) {
        console.log(
          '🕷️ 리프레시 실패 - 스토리지 초기화 및 로그인 화면으로 이동',
        );

        failedRequests.forEach(({reject}) => reject(err as AxiosError));
        failedRequests = [];

        await resetToLoginIfNeeded(stackNavigation, setAuth);

        return Promise.reject(err);
      } finally {
        isTokenRefreshing = false;
        console.log('================== REFRESH END ==================');
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
    console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log(`${config.url} -- ✈ `, config.data || '');
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
