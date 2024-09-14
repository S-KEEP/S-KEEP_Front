import {firebase} from '@react-native-firebase/messaging';
import {usePatchFCMToken} from './mutations/user/usePatchFCMToken';
import {Alert} from 'react-native';
import {useEffect} from 'react';

const messaging = firebase.messaging();

export default function usePushNotification() {
  useEffect(() => {
    const unsubscribe = messaging.onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  messaging.setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  /**
   * checkPermission
   * 알림 권한 확인 후, FCM token 요청
   */
  async function checkPermission() {
    const authStatus = await messaging.hasPermission();
    const isAuthorized =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Permission Status:', authStatus, isAuthorized);

    if (isAuthorized) {
      return await getToken();
    }

    return await requestUserPermission();
  }
  async function requestUserPermission() {
    const authStatus = await messaging.requestPermission();
    const isAuthorized =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (!isAuthorized) {
      throw new Error('알림 권한을 허용해야 토큰을 받을 수 있습니다.');
    }

    return await getToken();
  }

  async function getToken() {
    const fcmToken = await messaging.getToken();
    console.log('Device FCM Token:', fcmToken);

    return fcmToken;
  }

  return {checkPermission};
}
