import React from 'react';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {appleClient} from '../../apis/appleClients';
import useSocialLoginMutation from '../../hooks/auth/useSocialLoginMutation';
import useAuthStorage from '../../hooks/auth/useAuthStorage';
import {useSetRecoilState} from 'recoil';
import {userInfoState} from '../../libs/recoil/states/userInfo';
import {authState} from '../../libs/recoil/states/auth';
import styles from './AppleLogin.style';
import {View} from 'react-native';
import {userAppleInfoState} from '../../libs/recoil/states/userAppleInfo';

function AppleLogin() {
  const {setAuthData} = useAuthStorage();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setAuth = useSetRecoilState(authState);
  const {authMutation} = useSocialLoginMutation();
  const setUserAppleInfo = useSetRecoilState(userAppleInfoState);

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

      const username = fullName?.givenName || fullName?.familyName || '회원';

      if (idToken && authState === appleAuth.State.AUTHORIZED) {
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
              console.error('Apple Sign In Error ---- ✈️', error);
            },
            onSuccess: async ({accessToken, refreshToken}) => {
              setAuthData({accessToken, refreshToken});
              setUserInfo({username});
              setAuth({isAuthenticated: true});

              setUserAppleInfo({
                email: email || '',
                user: user || '',
                fullName: {
                  firstName: fullName?.givenName || '',
                  lastName: fullName?.familyName || '',
                },
                identityToken: idToken,
                authorizationCode: code || '',
              });
              console.log(idToken);
            },
          },
        );
      }
    } catch (error) {
      console.error('Apple Sign In Error ---- ✈️', error);
    }
  };

  return (
    <View style={styles.container}>
      <AppleButton
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appleButtonStyle}
        onPress={handlePressAppleLoginButton}
      />
    </View>
  );
}

export default AppleLogin;
