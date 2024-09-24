import {useQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {FRIEND_KEYS} from '../QueryKeys';
import {FriendCategory, UserCategory} from '../../../types/dtos/category';

/**
 *  친구 카테고리 목록 조회
 */

export const getFriendCategoryList = async (targetId: number) => {
  const {data} = await GET<FriendCategory>(
    `/api/user/${targetId}/user-category`,
  );

  return data.result;
};

export const useGetFriendCategoryList = (targetId: number) => {
  const QUERY_KEY = FRIEND_KEYS.all;

  const {data, isPending, isError, refetch} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getFriendCategoryList(targetId).then(res => res),
  });

  return {data, isPending, isError, refetch};
};
