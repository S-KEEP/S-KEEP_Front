// import {useQuery} from '@tanstack/react-query';
// import {GET} from '../../../apis/client';
// import {LOCATION_KEYS} from '../QueryKeys';
// import {UserLocation} from '../../../types/dtos/location';

// /**
//  *  친구 여행지 상세 조회
//  */

// export interface GetFriendLocationRequest {
//   targetId: number;
//   userLocationId: number;
// }

// export const getLocation = async ({
//   targetId,
//   userLocationId,
// }: GetFriendLocationRequest) => {
//   const {data} = await GET<UserLocation>(
//     `/api/user-location/${userLocationId}`,
//   );
//   if (data.errorCode) throw new Error(`${data.errorCode}: ${data.message}`);
//   return data.result;
// };

// export const useGetLocation = ({
//   targetId,
//   userLocationId,
// }: GetFriendLocationRequest) => {
//   const QUERY_KEY = LOCATION_KEYS.detail(String(userLocationId));

//   const {data, isLoading, isError, refetch} = useQuery({
//     queryKey: QUERY_KEY,
//     queryFn: () => getLocation(userLocationId).then(res => res),
//   });

//   return {data, isLoading, isError, refetch};
// };
