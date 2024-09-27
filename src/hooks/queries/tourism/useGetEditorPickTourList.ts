import {useQuery} from '@tanstack/react-query';
import {EDITOR_TOUR_KEYS} from '../QueryKeys';
import {EditorTourLocationDto} from '../../../types/dtos/tourLocation';
import {GET} from '../../../apis/client';

export interface GetTourListResponse {
  picksDtoList: EditorTourLocationDto[];
  totalCount: number;
}

/**
 *  에디터 픽 관광명소 리스트 조회
 */
export const getEditorTourList = async () => {
  const {data} = await GET<GetTourListResponse>(`/api/picks`);
  return data.result;
};

export const useGetEditorPickTourList = () => {
  const QUERY_KEY = EDITOR_TOUR_KEYS.all;

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getEditorTourList().then(res => res),
  });

  return {data, isLoading, isError, refetch};
};
