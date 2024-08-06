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
    console.log('바디', response.data); //accessToken & refreshToken
    return response.data;
  },

  postLogoutUser: async (body: {refreshToken: string}) => {
    const response = await axiosApi.post('/auth/logout', {
      refreshToken: body.refreshToken,
    });
    return response.data.result;
  },

  deleteUser: async () => {
    const response = await axiosApi.delete('/auth/withdrawal');
    return response.data.result;
  },
};
