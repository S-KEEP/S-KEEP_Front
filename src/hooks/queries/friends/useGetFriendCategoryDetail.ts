import {useInfiniteQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {useCallback} from 'react';
import {FRIEND_KEYS} from '../QueryKeys';
import {UserLocation} from '../../../types/dtos/location';
import {IPage} from '../../../types/dtos/category';

export interface GetFriendDetailRequest {
  targetId: number;
  userCategoryId: number;
  page: number;
}

const getCategoryList = async ({
  targetId,
  userCategoryId,
  page,
}: GetFriendDetailRequest) => {
  const {
    data: {result},
  } = await GET<IPage<UserLocation>>(
    `/api/user/${targetId}/user-category/${userCategoryId}/user-location?page=${page}`,
  );

  console.log('========카테고리 선택완료=========', userCategoryId);
  return {
    items: result.userLocationList,
    nextPage: result.totalPage > page ? page + 1 : undefined,
    totalPage: result.totalPage,
    totalElement: result.totalElement,
  };
};

const useGetFreindCategoryDetail = (requestParams: GetFriendDetailRequest) => {
  const {data, hasNextPage, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: FRIEND_KEYS.list(requestParams),
    queryFn: ({pageParam = 1}: {pageParam?: number}) =>
      getCategoryList({...requestParams, page: pageParam}),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => ({
      pages: data.pages.flatMap(page => page.items),
      totalElement: data.pages?.[0]?.totalElement ?? 0,
    }),
    initialPageParam: requestParams.page,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return {
    data: data?.pages,
    loadMore,
    isFetching,
    hasNextPage,
    totalElement: data?.totalElement,
  };
};

export default useGetFreindCategoryDetail;
