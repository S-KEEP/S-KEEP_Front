import {useMutation} from '@tanstack/react-query';
import {DELETE} from '../../../apis/client';

interface DeleteCategoryRequest {
  userCategoryId: number;
}

/**
 *  카테고리 삭제
 */
export const deleteCategory = async ({
  userCategoryId,
}: DeleteCategoryRequest) => {
  const res = await DELETE(`/api/user-category/${userCategoryId}`);
  return res.data;
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (req: DeleteCategoryRequest) => deleteCategory(req),
  });
};
