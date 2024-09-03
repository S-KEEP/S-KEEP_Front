import {useQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {TOUR_KEYS} from '../QueryKeys';
import {WeatherDTO} from '../../../types/dtos/weather';
import {TourLocationDTO} from '../../../types/dtos/tourLocation';

export interface GetTourListRequest {
  x: string;
  y: string;
}

export interface GetTourListResponse {
  tourLocationDtolist: TourLocationDTO[];
  totalCount: number;
}

/**
 *  관광명소 리스트 조회
 */
export const getTourList = async ({x, y}: GetTourListRequest) => {
  const {data} = await GET<GetTourListResponse>(
    `/api/tourism-org?x=${x}&y=${y}`,
  );

  if (data.errorCode) throw new Error(`${data.errorCode}: ${data.message}`);
  return data.result;
};

export const useGetTourList = (req: GetTourListRequest) => {
  const QUERY_KEY = TOUR_KEYS.detail(req);

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getTourList(req).then(res => res),
  });

  return {data, isLoading, isError, refetch};
};
