import {useMutation} from '@tanstack/react-query';
import {POST} from '../../../apis/client';

/**
 *  친구 초대하기 토큰 발급
 */
export const postInvitationToken = async () => {
  const res = await POST(`/api/friend/invite`);
  return res.data;
};

export const usePostInvitationToken = () => {
  const postInvitationTokenMutation = useMutation({
    mutationFn: () => postInvitationToken(),
  });

  return {postInvitationTokenMutation};
};

