import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import StackNavigator from '../navigators/StackNavigator';
import {lightPalette} from '../styles';
import LoginScreen from '../screens/Login/LoginScreen';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';
import useInitialData from '../hooks/auth/useInitialData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosApi} from '../apis/client';

const theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, ...lightPalette},
};

const Navigator = () => {
  const {authData, setAuthData} = useInitialData();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        //await AsyncStorage.clear();
        // await localStorage.set(
        //   TokenKeys.AccessToken,
        //   'eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoxLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyNDE3MzM4NCwiZXhwIjoxNzI0MTczNDQ0fQ.nrbSEa9osd2Jv2lh62P1EwktquglQQpOvU_6xJ_3Xj_R_ne3jI4ttQByHeLyzrkplQSi8GMYP0l0pCkf1kmA8w',
        // );
        // await localStorage.set(
        //   TokenKeys.RefreshToken,
        //   'eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoxLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyNDE3Mzg3NywiZXhwIjoxNzI0Nzc4Njc3fQ.F-W9XRT6h57gwnSkxoyaUEGg6M5zWT-OrSkzi0EBvHPHOd8-O4-grYFiO0AO3ZFyykQgORFvH_FW4nSjv-_1VQ',
        // );
        const accessToken = await localStorage.get(TokenKeys.AccessToken);
        const refreshToken = await localStorage.get(TokenKeys.RefreshToken);
        if (refreshToken == null) {
          try {
            const response = await axiosApi.post('/api/auth/jwt/reissue', {
              refreshToken,
            });
            const result = response.data.result;

            await localStorage.set(TokenKeys.AccessToken, result.accessToken);

            if (!!result.accessToken && !!result.refreshToken) {
              setAuthData({isAuthenticated: true});
            }
          } catch (e) {
            await AsyncStorage.clear();
            console.error('refreshToken 로그아웃 실패 ---- ✈️', e);
          }
        }

        if (accessToken) {
          setAuthData({isAuthenticated: true});
        } else {
          setAuthData({isAuthenticated: false});
        }
      } catch (error) {
        setAuthData({isAuthenticated: false});
        console.error('Error checking authentication: --- ✈️', error);
      }
    };

    checkAuth();
  }, [setAuthData]);

  return (
    <NavigationContainer theme={theme}>
      {authData.isAuthenticated ? <StackNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default Navigator;
