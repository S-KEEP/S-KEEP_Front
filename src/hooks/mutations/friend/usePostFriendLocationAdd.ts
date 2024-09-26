import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';

interface AddFriendLocationRequest {
  targetId: number;
  targetLocationId: number;
  userCategoryId: number;
}

/**
 *  친구 여행지 내 카테고리에 추가
 */

export const postFriendLocationAdd = async ({
  targetId,
  targetLocationId,
  userCategoryId,
}: AddFriendLocationRequest) => {
  const res = await POST<string>(`/api/user/${targetId}/user-location`, {
    targetLocationId,
    userCategoryId,
  });

  console.log('✅ 친구 명소 내 카테고리 추가 완료 : ', res.data);
  return res.data;
};

interface PostFriendLocationMutationProps {
  onSuccess: (res: BaseResponse<string>, req: AddFriendLocationRequest) => void;
  onError: (e: Error) => void;
}

export const usePostFriendLocationAdd = ({
  onSuccess,
  onError,
}: PostFriendLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: AddFriendLocationRequest) => postFriendLocationAdd(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
