import {useInfiniteQuery} from '@tanstack/react-query';
import {axiosApi} from '../../../apis/client';
import {useCallback} from 'react';

interface Page<T> {
  result: {
    userLocationList: T[];
    totalPage: number;
  };
}

export interface GetPostHistoryRequest {
  userCategory: string;
  page: number;
}

interface ILocation {
  id: number;
  kakaoMapId: string;
  placeName: string;
  roadAddress: string;
  x: string;
  y: string;
}

interface ICategory {
  id: number;
  title: string;
  description: string;
}

export interface IUserLocation {
  id: number;
  photoUrl: string;
  location: ILocation;
  userCategory: ICategory;
}

const getCategoryList = async ({userCategory, page}: GetPostHistoryRequest) => {
  console.log('호출할때 카테고리는', userCategory, page);
  console.log(`/api/user-location/${page}${userCategory}`);
  const {
    data: {result},
  } = await axiosApi.get<Page<IUserLocation>>('/api/user-location', {
    params: {
      page,
      userCategory,
    },
  });

  console.log('엠아이쿠라잉?', result.userLocationList);
  return {
    items: result.userLocationList,
    nextPage: result.totalPage > page ? page + 1 : undefined,
    totalPage: result.totalPage,
  };
};

const POST_HISTORY_KEY = 'POST_HISTORY_KEY';

const useGetCategoryList = (requestParams: GetPostHistoryRequest) => {
  const {data, hasNextPage, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: [POST_HISTORY_KEY, requestParams],
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

  console.log('엠아이쿠라잉?', data?.pages);
  return {
    data: data?.pages,
    loadMore,
    isFetching,
    hasNextPage,
  };
};

export default useGetCategoryList;
