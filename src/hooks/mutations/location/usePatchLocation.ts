import {useMutation} from '@tanstack/react-query';
import {BaseResponse, PATCH} from '../../../apis/axiosInstance';

interface ModifyLocationReqeust {
  userLocationId: number;
  userCategoryId: number;
}

/**
 *  명소 정보 수정 (카테고리)
 */
export const modifyLocation = async ({
  userLocationId,
  userCategoryId,
}: ModifyLocationReqeust) => {
  const res = await PATCH<boolean>(`/user-location/${userLocationId}`, {
    userCategoryId: userCategoryId,
  });
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<boolean>) => void;
  onError: (e: Error) => void;
}

export const usePatchLocation = ({
  onSuccess,
  onError,
}: PostLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: ModifyLocationReqeust) => modifyLocation(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
