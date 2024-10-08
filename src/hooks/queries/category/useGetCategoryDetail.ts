import {useInfiniteQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {useCallback} from 'react';
import {CATEGORY_KEYS} from '../QueryKeys';
import {UserLocation} from '../../../types/dtos/location';
import {IPage} from '../../../types/dtos/category';

export interface GetPostHistoryRequest {
  userCategoryId: number;
  page: number;
}

const getCategoryList = async ({
  userCategoryId,
  page,
}: GetPostHistoryRequest) => {
  const {
    data: {result},
  } = await GET<IPage<UserLocation>>(
    `/api/user-location?page=${page}&userCategoryId=${userCategoryId}`,
  );

  console.log(userCategoryId);
  return {
    items: result.userLocationList,
    category: result.userCategory,
    nextPage: result.totalPage > page ? page + 1 : undefined,
    totalPage: result.totalPage,
    totalElement: result.totalElement,
  };
};

const useGetCategoryList = (requestParams: GetPostHistoryRequest) => {
  const {data, hasNextPage, fetchNextPage, isFetching, isLoading} = useInfiniteQuery({
    queryKey: CATEGORY_KEYS.list(requestParams),
    queryFn: ({pageParam = 1}: {pageParam?: number}) =>
      getCategoryList({...requestParams, page: pageParam}),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => ({
      pages: data.pages.flatMap(page => page.items),
      category: data.pages?.[0]?.category,
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
    isLoading,
    hasNextPage,
    totalElement: data?.totalElement,
    category: data?.category,
  };
};

export default useGetCategoryList;
