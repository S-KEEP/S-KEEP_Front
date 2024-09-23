import React, {useEffect} from 'react';
import StackNavigator from '../navigators/StackNavigator';
import Login from '../screens/Login/Login';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';
import useInitialData from '../hooks/auth/useInitialData';
import SplashScreen from 'react-native-splash-screen';
import {Interceptor} from '../apis/client';
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {StackParamList} from './types';
import {lightPalette} from '../styles';

const Navigator = () => {
  const {authData, setAuthData} = useInitialData();
  const linking: LinkingOptions<StackParamList> = {
    prefixes: ['kakao378c5d01c3e4b03529594678b0a76911://'],
    config: {
      screens: {
        TabNavigator: {
          screens: {
            SettingTab: {
              path: 'kakaolink',
            },
          },
        },
      },
    },
  };

  const theme = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, ...lightPalette},
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await localStorage.get(TokenKeys.AccessToken);

        if (accessToken) {
          setAuthData({isAuthenticated: true});
        } else {
          setAuthData({isAuthenticated: false});
        }
      } catch (error) {
        setAuthData({isAuthenticated: false});
        console.error('Error checking authentication: --- ✈️', error);
      }

      SplashScreen.hide();
    };

    checkAuth();
  }, [setAuthData]);

  return (
    <NavigationContainer linking={linking} theme={theme}>
      <Interceptor>
        {authData.isAuthenticated ? <StackNavigator /> : <Login />}
      </Interceptor>
    </NavigationContainer>
  );
};

export default Navigator;
