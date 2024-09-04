import {useMutation} from '@tanstack/react-query';
import {BaseResponse, PATCH} from '../../../apis/client';
import {ICategory} from '../../../types/dtos/location';

interface ModifyLocationRequest {
  userLocationId: number;
  userCategoryId: number;
  userCategory: ICategory;
}

/**
 *  여행지 정보 수정 (카테고리)
 */
export const modifyLocation = async ({
  userLocationId,
  userCategoryId,
}: ModifyLocationRequest) => {
  const res = await PATCH<boolean>(
    `/api/user-location/${userLocationId}/category`,
    {
      userCategoryId: userCategoryId,
    },
  );
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<boolean>, req: ModifyLocationRequest) => void;
  onError: (e: Error) => void;
}

export const usePatchLocation = ({
  onSuccess,
  onError,
}: PostLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: ModifyLocationRequest) => modifyLocation(req),
    onSuccess: (res, variables) => {
      onSuccess(res, variables);
    },
    onError: onError,
  });
};
