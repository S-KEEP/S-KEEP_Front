import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useSetRecoilState} from 'recoil';
import StackNavigator from '../navigators/StackNavigator';
import {lightPalette} from '../styles';
import LoginScreen from '../screens/Login/LoginScreen';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';
import {axiosApi} from '../apis/axiosInstance';
import useInitialData from '../hooks/auth/useInitialData';
import {authApi} from '../apis/authApi';
import {userInfoState} from '../libs/recoil/states/userInfo';

const theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, ...lightPalette},
};

const Navigator = () => {
  const {authData, setAuthData} = useInitialData();
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const refreshToken = await localStorage.get(TokenKeys.RefreshToken);
        if (refreshToken !== null) {
          try {
            const response = await axiosApi.post('/api/auth/jwt/reissue', {
              refreshToken,
            });
            const result = response.data.result;

            await localStorage.set(TokenKeys.AccessToken, result.accessToken);
            await localStorage.set(TokenKeys.RefreshToken, result.refreshToken);

            if (!!result.accessToken && !!result.refreshToken) {
              setAuthData({isAuthenticated: true});
            }
          } catch (e) {
            await authApi.postLogoutUser({refreshToken});
            console.error('refreshToken 로그아웃 실패 ---- ✈️', e);
          }
        }
      } catch (error) {
        console.error('storage에 토근 저장 실패 ---- ✈️', error);
      }
    };

    checkAuth();
  }, [setAuthData, setUserInfo]);

  return (
    <NavigationContainer theme={theme}>
      {authData.isAuthenticated ? <StackNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default Navigator;
