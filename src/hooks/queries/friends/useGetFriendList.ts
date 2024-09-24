import {useQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {FRIEND_DETAIL_KEYS} from '../QueryKeys';
import {UserFriendResponseDto} from '../../../types/dtos/category';

/**
 *  친구 목록 조회
 */

export const getFriendList = async (page: number) => {
  const {data} = await GET<UserFriendResponseDto>(`/api/friend?page=0`);
  return data.result;
};

export const useGetFriendList = (page: number) => {
  const QUERY_KEY = FRIEND_DETAIL_KEYS.all;

  const {data, isPending, isError, refetch} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getFriendList(page).then(res => res),
  });

  return {data, isPending, isError, refetch};
};
