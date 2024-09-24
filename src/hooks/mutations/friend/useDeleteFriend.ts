import {useMutation} from '@tanstack/react-query';
import {BaseResponse, DELETE} from '../../../apis/client';

interface DeleteLocationRequest {
  targetId: number;
}

/**
 *  친구 삭제
 */
export const deleteFriend = async ({targetId}: DeleteLocationRequest) => {
  console.log(targetId);
  const res = await DELETE<boolean>(`/api/friend/user/${targetId}`);
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<boolean>) => void;
  onError: (e: Error) => void;
}

export const useDeleteFriend = ({
  onSuccess,
  onError,
}: PostLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: DeleteLocationRequest) => deleteFriend(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
