import {useInfiniteQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {useCallback} from 'react';
import {NOTIFICATION_KEYS} from '../QueryKeys';

const getNotificationList = async (page: number) => {
  const {
    data: {result},
  } = await GET<GetNotificationResponse>(`/api/notification?page=${page}`);

  console.log('>', result);
  return {
    notificationList: result.notificationList,
    nextPage: result.totalPage > page ? page + 1 : undefined,
    totalPage: result.totalPage,
  };
};

export interface NotificationDTO {
  id: number;
  title: string;
  body: string;
  type: string;
  isChecked: boolean;
  createdAt: string;
}

interface GetNotificationResponse {
  totalPage: number;
  notificationList: NotificationDTO[];
}

const useGetNotification = (page: number) => {
  const {data, hasNextPage, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: NOTIFICATION_KEYS.list({page: page}),
    queryFn: ({pageParam = 1}: {pageParam?: number}) =>
      getNotificationList(pageParam),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => ({
      pages: data.pages.flatMap(page => page.notificationList),
    }),
    initialPageParam: page,
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

export default useGetNotification;
