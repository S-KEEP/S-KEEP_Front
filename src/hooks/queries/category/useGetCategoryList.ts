import {useQuery} from '@tanstack/react-query';
import {categoryQueryKeys} from '../../../constants/queryKeys/category';
import {CategoryCardResponseDto} from '../../../types/dtos/category';
import {axiosApi} from '../../../apis/client';

export const categoryApi = {
  getCategoryList: async (): Promise<CategoryCardResponseDto> => {
    const {data} = await axiosApi.get('/api/userCategory/list');
    // console.log(data.result.userCategoryDtoList);
    return data.result.userCategoryDtoList;
  },
};

export const useGetCategoryListQuery = () => {
  const {data: cardListData = []} = useQuery({
    queryKey: [categoryQueryKeys.cardList],
    queryFn: categoryApi.getCategoryList,
  });

  return cardListData;
};
