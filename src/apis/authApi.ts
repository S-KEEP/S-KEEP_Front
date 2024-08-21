import {axiosApi} from './client';
import {AuthResponseDto, DeleteAccountResponseDto} from '../types/dtos/auth';

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

    return response.data.result;
  },

  deleteAccount: async () => {
    const response = await axiosApi.post('/api/user/withdrawal');
    return response.data.result;
  },

  deleteAppleId: async (body: {
    state: null;
    code: string | null;
    id_token: string;
    user: {
      email: string | null;
      name: {firstName: string | null; lastName: string | null};
    };
  }): Promise<DeleteAccountResponseDto> => {
    const response = await axiosApi.post(`/api/auth/apple/revoke`, body);

    return response.data.result;
  },
};
