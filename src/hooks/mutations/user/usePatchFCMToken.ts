import {useMutation} from '@tanstack/react-query';
import {BaseResponse, PATCH} from '../../../apis/client';

/**
 *  FCM 토큰 등록
 */
export const registerToken = async (token: string) => {
  const res = await PATCH<string>(`/api/user/fcm-token`, {token: token});
  return res.data;
};

interface PatchFCMTokenProps {
  onSuccess: (res: BaseResponse<string>) => void;
  onError: (e: Error) => void;
}

export const usePatchFCMToken = ({onSuccess, onError}: PatchFCMTokenProps) => {
  return useMutation({
    mutationFn: (req: string) => registerToken(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
