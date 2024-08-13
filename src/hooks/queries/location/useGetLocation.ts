import {useQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/axiosInstance';
import {LOCATION_KEYS} from '../QueryKeys';
import {UserLocation} from '../../../types/dtos/location';

/**
 *  명소 상세 조회
 */
export const getLocation = async (userLocationId: number) => {
  const {data} = await GET<UserLocation>(
    `/api/user-location/${userLocationId}`,
  );
  console.log(`/api/user-location/${userLocationId} -- ✈ `, data);
  if (data.errorCode) throw new Error(`${data.errorCode}: ${data.message}`);
  return data.result;
};

export const useGetLocation = (userLocationId: number) => {
  const QUERY_KEY = LOCATION_KEYS.detail(String(userLocationId));

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getLocation(userLocationId).then(res => res),
  });

  return {data, isLoading, isError, refetch};
};
