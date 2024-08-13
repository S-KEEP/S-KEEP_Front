import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/axiosInstance';
import {UserLocation} from '../../../types/dtos/location';

/**
 * AnalyzeLocationResponse
 */
export interface AnalyzeLocationResponse {
  userLocationList: UserLocation[];
}

/**
 *  명소 추가 (스크린샷 분석, 카테고리 분류)
 */
export const addLocation = async (formdata: FormData) => {
  const res = await POST<AnalyzeLocationResponse>(
    `/api/user-location`,
    formdata,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<AnalyzeLocationResponse>) => void;
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
