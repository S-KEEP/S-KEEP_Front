import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';
import {checkPermission} from '../../../utils/pushUtils';

interface CheckNotificationRequest {
  id: number;
  type: string;
}

/**
 *  푸시 확인 API
 */
export const checkNotification = async (req: CheckNotificationRequest) => {
  const res = await POST<string>(`/api/notification/check`, req);
  return res.data;
};

interface PatchFCMTokenProps {
  onSuccess: (res: BaseResponse<string>) => void;
  onError: (e: Error) => void;
}

export const usePatchNotification = ({
  onSuccess,
  onError,
}: PatchFCMTokenProps) => {
  return useMutation({
    mutationFn: (req: CheckNotificationRequest) => checkNotification(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
