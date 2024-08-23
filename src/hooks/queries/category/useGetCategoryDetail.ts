import {useInfiniteQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {useCallback} from 'react';
import {CATEGORY_KEYS} from '../QueryKeys';
import {UserLocation} from '../../../types/dtos/location';
import {Page} from '../../../types/dtos/category';

export interface GetPostHistoryRequest {
  userCategory: string;
  page: number;
}

const getCategoryList = async ({userCategory, page}: GetPostHistoryRequest) => {
  const {
    data: {result},
  } = await GET<Page<UserLocation>>('/api/user-location', {
    params: {
      page,
      userCategory,
    },
  });

  return {
    items: result.userLocationList,
    nextPage: result.totalPage > page ? page + 1 : undefined,
    totalPage: result.totalPage,
  };
};

const useGetCategoryList = (requestParams: GetPostHistoryRequest) => {
  const {data, hasNextPage, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: CATEGORY_KEYS.list(requestParams),
    queryFn: ({pageParam = 1}: {pageParam?: number}) =>
      getCategoryList({...requestParams, page: pageParam}),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => ({
      pages: data.pages.flatMap(page => page.items),
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
  };
};

export default useGetCategoryList;
