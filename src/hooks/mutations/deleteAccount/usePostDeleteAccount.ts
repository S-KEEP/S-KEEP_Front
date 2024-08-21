import {useMutation} from '@tanstack/react-query';
import useInitialData from '../../auth/useInitialData';
import {authApi} from '../../../apis/authApi';
import localStorage from '../../../libs/async-storage';

/**
 *  회원 탈퇴
 */
export const useDeleteAccountMutation = () => {
  const {setAuthData} = useInitialData();

  const deleteAccountMutation = useMutation({
    mutationFn: authApi.deleteAccount,
    onSuccess: () => {
      setAuthData({isAuthenticated: false});
      localStorage.clearAll();
    },
  });

  return {deleteAccountMutation};
};
