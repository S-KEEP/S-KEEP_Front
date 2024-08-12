import {useMutation} from '@tanstack/react-query';
import {BaseResponse, DELETE} from '../../../apis/client';

interface DeleteLocationRequest {
  userLocationId: number;
}

/**
 *  명소 삭제
 */
export const deleteLocation = async ({
  userLocationId,
}: DeleteLocationRequest) => {
  const res = await DELETE<boolean>(`/user-location/${userLocationId}`);
  console.log('>> ', res);
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<boolean>) => void;
  onError: (e: Error) => void;
}

export const useDeleteLocation = ({
  onSuccess,
  onError,
}: PostLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: DeleteLocationRequest) => deleteLocation(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
