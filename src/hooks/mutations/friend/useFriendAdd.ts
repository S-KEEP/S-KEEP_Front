import {useMutation} from '@tanstack/react-query';
import {BaseResponse, PATCH} from '../../../apis/client';

interface FriendTokenPropRequest {
  token: string;
}

/**
 *  친구 추가하기
 */
export const pathchFriendAdd = async ({token}: FriendTokenPropRequest) => {
  const res = await PATCH<string>(`/api/friend`, {token}); 
  
  return res.data;
};

interface PostInvitationTokenProps {
  onSuccess: (res: BaseResponse<string>) => void;
  onError: (e: Error) => void;
}

export const usePatchFriendAdd = ({
  onSuccess,
  onError,
}: PostInvitationTokenProps) => {
  return useMutation({
    mutationFn: (req: FriendTokenPropRequest) => pathchFriendAdd(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
