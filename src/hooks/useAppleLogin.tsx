import {useSetRecoilState} from 'recoil';
import appleAuth from '@invertase/react-native-apple-authentication';
import useAuthStorage from './auth/useAuthStorage';
import {userInfoState} from '../libs/recoil/states/userInfo';
import {authState} from '../libs/recoil/states/auth';
import useSocialLoginMutation from './auth/useSocialLoginMutation';
import {
  UserAppleInfoType,
  userAppleInfoState,
} from '../libs/recoil/states/userAppleInfo';
import {appleClient} from '../apis/appleClients';
export const useAppleLogin = () => {
  const {setAuthData} = useAuthStorage();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setAuth = useSetRecoilState(authState);
  const {authMutation} = useSocialLoginMutation();
  const setUserAppleInfo = useSetRecoilState(userAppleInfoState);

  const signInWithApple = async (): Promise<UserAppleInfoType | null> => {
    try {
      const {
        email,
        user,
        fullName,
        identityToken: idToken,
        authorizationCode: code,
      } = await appleClient.fetchLogin();
      const authState = await appleClient.getUserAuthState(user);

      const username = fullName?.givenName || fullName?.familyName || '회원';

      if (idToken && authState === appleAuth.State.AUTHORIZED) {
        return new Promise((resolve, reject) => {
          authMutation.mutate(
            {
              id_token: idToken,
              code,
              user: {
                email,
                name: {
                  firstName: fullName?.givenName || '',
                  lastName: fullName?.familyName || '',
                },
              },
              state: null,
            },
            {
              onError: error => {
                console.error('Apple Sign In Error!!! ---- ✈️', error);
                reject(error);
              },
              onSuccess: async ({accessToken, refreshToken}) => {
                setAuthData({accessToken, refreshToken});
                setUserInfo({username});
                setAuth({isAuthenticated: true});

                const updatedAppleInfo: UserAppleInfoType = {
                  email: email || '',
                  user: user || '',
                  fullName: {
                    firstName: fullName?.givenName || '',
                    lastName: fullName?.familyName || '',
                  },
                  identityToken: idToken,
                  authorizationCode: code || '',
                };
                setUserAppleInfo(updatedAppleInfo);

                resolve(updatedAppleInfo);
              },
            },
          );
        });
      } else {
        throw new Error('Apple Sign In failed: Unauthorized');
      }
    } catch (error) {
      console.error('Apple Sign In Error ---- ✈️', error);
      throw error;
    }
  };

  return signInWithApple;
};
