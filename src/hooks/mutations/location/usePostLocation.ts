import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';

/**
 *  명소 추가
 */
export const addLocation = async (formdata: FormData) => {
  const res = await POST<string>(`/user-location`, formdata, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  console.log('>> ', res);
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<string>) => void;
  onError: (e: Error) => void;
}

export const usePostLocation = ({
  onSuccess,
  onError,
}: PostLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: FormData) => addLocation(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
