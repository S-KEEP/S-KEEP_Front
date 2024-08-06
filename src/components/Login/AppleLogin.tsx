import React from 'react';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {appleClient} from '../../apis/appleClients';
import useSocialLoginMutation from '../../hooks/auth/useSocialLoginMutation';
import useAuthStorage from '../../hooks/auth/useAuthStorage';
import {useSetRecoilState} from 'recoil';
import {userInfoState} from '../../libs/recoil/states/userInfo';
import {authApi} from '../../apis/authApi';

function AppleLogin() {
  const {setAuthData} = useAuthStorage();
  const setUserInfo = useSetRecoilState(userInfoState);

  const {authMutation} = useSocialLoginMutation();

  const handlePressAppleLoginButton = async () => {
    try {
      const {
        email,
        user,
        fullName,
        identityToken: idToken,
        authorizationCode: code,
      } = await appleClient.fetchLogin();

      const authState = await appleClient.getUserAuthState(user);

      if (idToken && authState === appleAuth.State.AUTHORIZED) {
        const body = {
          state: null,
          code,
          id_token: idToken,
          user: {
            email,
            name: {
              firstName: fullName?.givenName || '',
              lastName: fullName?.familyName || '',
            },
          },
        };

        const response = await authApi.postLoginUser(body);

        if (response) {
          const {accessToken, refreshToken} = response;
          setAuthData({accessToken, refreshToken});
          console.log(accessToken);
          setUserInfo({username: fullName?.nickname || '회원'});
        }
      }
    } catch (error) {
      console.error('Apple Sign In Error:', error);
    }
  };

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: '100%', // You must specify a width
        height: 45, // You must specify a height
      }}
      onPress={handlePressAppleLoginButton}
    />
  );
}

export default AppleLogin;
