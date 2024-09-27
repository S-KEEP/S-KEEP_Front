import {useMutation} from '@tanstack/react-query';
import {BaseResponse, POST} from '../../../apis/client';

interface AddEditorLocationRequest {
  title: string;
  userCategoryId: number;
}

/**
 *  /api/picks?userCategoryId=1&title=
 */

export const postEditorLocationAdd = async ({
  title,
  userCategoryId,
}: AddEditorLocationRequest) => {
  const res = await POST<string>(`/api/picks`, {
    userCategoryId,
    title,
  });

  console.log('✅ 친구 명소 내 카테고리 추가 완료 : ', res.data);
  return res.data;
};

interface PostEditorLocationMutationProps {
  onSuccess: (res: BaseResponse<string>, req: AddEditorLocationRequest) => void;
  onError: (e: Error) => void;
}

export const usePostEditorLocationAdd = ({
  onSuccess,
  onError,
}: PostEditorLocationMutationProps) => {
  return useMutation({
    mutationFn: (req: AddEditorLocationRequest) => postEditorLocationAdd(req),
    onSuccess: onSuccess,
    onError: onError,
  });
};
