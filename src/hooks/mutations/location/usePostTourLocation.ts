import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';
import {TourLocationDTO} from '../../../types/dtos/tourLocation';
import {ICategory} from '../../../types/dtos/location';

interface AddTourLocationReqeust {
  tourLocation: TourLocationDTO;
  category: ICategory;
}
/**
 *  관광 명소 추가
 */
export const addTourLocation = async ({
  tourLocation,
  category,
}: AddTourLocationReqeust) => {
  console.group(tourLocation, category);
  const res = await POST<string>(
    `/api/user-location/tourism-org/${category.id}`,
    tourLocation,
  );
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<string>, req: AddTourLocationReqeust) => void;
  onError: (e: Error) => void;
}

export const usePostTourLocation = ({
  onSuccess,
  onError,
}: PostLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: AddTourLocationReqeust) => addTourLocation(req),
    onSuccess: (res, variables) => {
      onSuccess(res, variables);
    },
    onError: onError,
  });
};
