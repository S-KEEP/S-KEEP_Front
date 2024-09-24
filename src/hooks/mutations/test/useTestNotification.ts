import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';
import {checkPermission} from '../../../utils/pushUtils';

interface SendFCMPushRequest {
  token: string;
  isCategory: boolean;
}

/**
 *  테스트 푸시 전송용
 */
export const sendFCMPush = async (req: SendFCMPushRequest) => {
  const res = await POST<string>(`/api/fcm/test`, req);
  return res.data;
};

interface PatchFCMTokenProps {
  onSuccess: (res: BaseResponse<string>) => void;
  onError: (e: Error) => void;
}

export const usePatchFCMToken = ({onSuccess, onError}: PatchFCMTokenProps) => {
  return useMutation({
    mutationFn: (req: SendFCMPushRequest) => sendFCMPush(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const sendCategoryPush = async () => {
  const token = await checkPermission();
  await sendFCMPush({token: token, isCategory: true});
};

export const sendDetailPush = async () => {
  const token = await checkPermission();
  await sendFCMPush({token: token, isCategory: false});
};
