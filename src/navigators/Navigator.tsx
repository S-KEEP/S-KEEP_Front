import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import StackNavigator from '../navigators/StackNavigator';
import {lightPalette} from '../styles';
import LoginScreen from '../screens/Login/LoginScreen';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';
import useInitialData from '../hooks/auth/useInitialData';

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
