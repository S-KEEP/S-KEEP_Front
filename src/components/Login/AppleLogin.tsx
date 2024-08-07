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
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './AppleLogin.style';
import {View} from 'react-native';

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
        console.log(body);
        const response = await authApi.postLoginUser(body);

        if (response) {
          const {accessToken, refreshToken} = response;
          setAuthData({accessToken, refreshToken});
          setUserInfo({username: fullName?.givenName || '회원'});

          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);
        }
      }
    } catch (error) {
      console.error('Apple Sign In Error:', error);
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
