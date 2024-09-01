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
  return res.data;
};

export const usePostAddCategory = () => {
  const addCategoryMutation = useMutation({
    mutationFn: (data: ICategoryData) => addCategory(data), // Use the mutation function with typed data
  });

  return {addCategoryMutation};
};
