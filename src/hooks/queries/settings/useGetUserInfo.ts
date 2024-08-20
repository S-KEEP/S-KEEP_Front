import {useQuery} from '@tanstack/react-query';
import {categoryQueryKeys} from '../../../constants/queryKeys/category';
import {axiosApi} from '../../../apis/client';
import {UserInfoResponseDto} from '../../../types/dtos/userInfo';
import {userInfoQueryKeys} from '../../../constants/queryKeys/userInfto';

export const userInfoApi = {
  getUserInfoList: async (): Promise<UserInfoResponseDto> => {
    const {data} = await axiosApi.get('/api/user');
    console.log('API response:', data);

    return {
      user: {
        name: data.result.name,
        email: data.result.email,
        provider: data.result.provider,
      },
    };
  },
};

export const useGetUserInfoQuery = () => {
  const {data: userInfoData} = useQuery({
    queryKey: [userInfoQueryKeys.userInfo],
    queryFn: userInfoApi.getUserInfoList,
  });

  return userInfoData;
};
