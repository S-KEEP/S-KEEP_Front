import {useQuery} from '@tanstack/react-query';
import {categoryQueryKeys} from '../../../constants/queryKeys/category';
import {CategoryCardResponseDto} from '../../../types/dtos/category';
import {axiosApi} from '../../../apis/client';
import {CATEGORY_KEYS} from '../QueryKeys';

export const categoryApi = {
  getCategoryList: async (): Promise<CategoryCardResponseDto> => {
    const {data} = await axiosApi.get('/api/user-category/list');
    return data.result.userCategoryDtoList;
  },
};

export const useGetCategoryListQuery = () => {
  const QUERY_KEY = CATEGORY_KEYS.all;

  const {data: cardListData = []} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: categoryApi.getCategoryList,
  });

  return cardListData;
};
