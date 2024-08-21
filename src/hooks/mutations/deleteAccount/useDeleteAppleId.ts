import {useMutation} from '@tanstack/react-query';
import {authApi} from '../../../apis/authApi';

/**
 *  애플 연동 해제
 */
export const useDeleteAppleIdMutation = () => {
  const DeleteAppleIdMutation = useMutation({
    mutationFn: (body: {
      state: null;
      code: string | null;
      id_token: string;
      user: {
        email: string | null;
        name: {firstName: string | null; lastName: string | null};
      };
    }) => authApi.deleteAppleId(body),
  });

  return {DeleteAppleIdMutation};
};
