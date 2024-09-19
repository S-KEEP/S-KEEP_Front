import React, {useEffect} from 'react';
import StackNavigator from '../navigators/StackNavigator';
import Login from '../screens/Login/Login';
import localStorage from '../libs/async-storage';
import {TokenKeys} from '../libs/async-storage/constants/keys';
import useInitialData from '../hooks/auth/useInitialData';
import SplashScreen from 'react-native-splash-screen';
import {Interceptor} from '../apis/client';

const Navigator = () => {
  const {authData, setAuthData} = useInitialData();

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
    <Interceptor>
      {authData.isAuthenticated ? <StackNavigator /> : <Login />}
    </Interceptor>
  );
};

export default Navigator;
