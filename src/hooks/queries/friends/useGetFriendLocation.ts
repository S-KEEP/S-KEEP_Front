import {useQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {FRIEND_LOCATION_KEYS} from '../QueryKeys';
import {UserLocation} from '../../../types/dtos/location';

/**
 *  친구 여행지 상세 조회
 */

export interface GetFriendLocationRequest {
  targetId: number;
  userLocationId: number;
}

export const getFriendLocation = async ({
  targetId,
  userLocationId,
}: GetFriendLocationRequest) => {
  const {data} = await GET<UserLocation>(
    `/api/user/${targetId}/user-location/${userLocationId}`,
  );

  console.log('=====상세조회 슛======', data.result);
  if (data.errorCode) throw new Error(`${data.errorCode}: ${data.message}`);
  return data.result;
};

export const useGetFriendLocation = (
  requestParams: GetFriendLocationRequest,
) => {
  const QUERY_KEY = FRIEND_LOCATION_KEYS.detail(String(requestParams));

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getFriendLocation(requestParams).then(res => res),
  });

  return {data, isLoading, isError, refetch};
};
