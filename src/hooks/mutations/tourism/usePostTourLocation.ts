import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';
import {UserLocation} from '../../../types/dtos/location';
import {TourLocationDTO} from '../../../types/dtos/tourLocation';

interface AddTourLocationReqeust {
  tourLocation: TourLocationDTO;
}
/**
 *  관광 명소 추가
 */
export const addTourLocation = async ({
  tourLocation,
}: AddTourLocationReqeust) => {
  const res = await POST<string>(`/api/user-location`, tourLocation);
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<string>) => void;
  onError: (e: Error) => void;
}

export const usePostTourLocation = ({
  onSuccess,
  onError,
}: PostLocationMutationProps) => {
  return useMutation({
    mutationFn: (tourLocation: AddTourLocationReqeust) => addTourLocation(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
