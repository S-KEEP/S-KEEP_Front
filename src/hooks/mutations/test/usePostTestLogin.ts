import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';

export interface TestLoginResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 *  테스트 계정 임시 로그인
 */
export const postTestLogin = async () => {
  const res = await POST<TestLoginResponse>(`/api/ping/login/test`);
  console.log('🔥테스트 계정 로그인 성공 : ', res.data.result);
  return res.data;
};

interface TestLoginProps {
  onSuccess: (res: BaseResponse<TestLoginResponse>) => void;
  onError: (e: Error) => void;
}

export const usePostTestLogin = ({onSuccess, onError}: TestLoginProps) => {
  return useMutation({
    mutationFn: () => postTestLogin(),
    onSuccess: onSuccess,
    onError: onError,
  });
};
