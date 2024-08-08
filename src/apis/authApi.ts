import {axiosApi} from './axiosInstance';
import {AuthResponseDto} from '../types/dtos/auth';

export const authApi = {
  postLoginUser: async (body: {
    state: null;
    code: string | null;
    id_token: string;
    user: {
      email: string | null;
      name: {firstName: string | null; lastName: string | null};
    };
  }): Promise<AuthResponseDto> => {
    const response = await axiosApi.post(`/api/auth/apple/login`, body);
    return response.data;
  },

  postLogoutUser: async (body: {refreshToken: string}) => {
    const response = await axiosApi.post('/api/auth/logoutt', {
      refreshToken: body.refreshToken,
    });
    return response.data.result;
  },
};
