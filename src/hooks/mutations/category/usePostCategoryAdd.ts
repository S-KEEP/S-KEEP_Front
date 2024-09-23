import {useMutation} from '@tanstack/react-query';
import {POST} from '../../../apis/client';

export interface ICategoryData {
  name: string;
  description: string;
}

/**
 *  카테고리 추가
 */
export const addCategory = async (data: ICategoryData) => {
  const res = await POST(`/api/user-category`, data);
  const locationHeader = res.headers['location'];
  console.log('headers', locationHeader);
  return {
    data: res.data,
    locationHeader,
  };
};

export const usePostAddCategory = () => {
  const addCategoryMutation = useMutation({
    mutationFn: (data: ICategoryData) => addCategory(data), 
  });

  return {addCategoryMutation};
};
