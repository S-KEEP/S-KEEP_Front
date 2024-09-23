import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';

export interface FriendTokenResponse {
  friendToken: string;
}

/**
 *  친구 초대하기 토큰 발급
 */
export const postInvitationToken = async () => {
  const res = await POST<FriendTokenResponse>(`/api/friend/invite`);
  console.log('친구 토큰 발급 호출 완료 : ', res.data.result.friendToken);
  return res.data;
};

interface PostInvitationTokenProps {
  onSuccess: (res: BaseResponse<FriendTokenResponse>) => void;
  onError: (e: Error) => void;
}

export const usePostInvitationToken = ({
  onSuccess,
  onError,
}: PostInvitationTokenProps) => {
  return useMutation({
    mutationFn: () => postInvitationToken(),
    onSuccess: onSuccess,
    onError: onError,
  });
};
