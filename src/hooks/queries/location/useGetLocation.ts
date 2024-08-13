import {useQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/axiosInstance';
import {LOCATION_KEYS} from '../QueryKeys';
import {UserLocation} from '../../../types/dtos/location';

/**
 * GetLocationResponse
 */
export interface GetLocationResponse {
  userLocation: UserLocation;
}

/**
 *  명소 상세 조회
 */
export const getLocation = async (userLocationId: number) => {
  const {data} = await GET<string>(`/api/user-location/${userLocationId}`);
  return data;
};

export const useGetLocation = (userLocationId: number) => {
  const QUERY_KEY = LOCATION_KEYS.detail(String(userLocationId));

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getLocation(userLocationId).then(res => res),
  });

  return {data, isLoading, isError, refetch};
};
