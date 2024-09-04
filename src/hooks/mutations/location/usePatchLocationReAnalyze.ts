import {useMutation} from '@tanstack/react-query';
import {BaseResponse, PATCH} from '../../../apis/client';
import {AnalyzeLocationResponse} from './usePostLocation';

export interface ReanalyzeRequest {
  userLocationList: {id: number; url: string}[];
}

/**
 *  여행지 재분석
 */
export const reanlyzeLocation = async ({
  userLocationList,
}: ReanalyzeRequest) => {
  const res = await PATCH<AnalyzeLocationResponse>(
    `/api/user-location/reanalysis`,
    {
      userLocationList: userLocationList,
    },
  );
  return res.data;
};

interface PostLocationMutationProps {
  onSuccess: (res: BaseResponse<AnalyzeLocationResponse>) => void;
  onError: (e: Error) => void;
}

export const usePatchLocationReAnalyze = ({
  onSuccess,
  onError,
}: PostLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: ReanalyzeRequest) => reanlyzeLocation(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
