import {firebase} from '@react-native-firebase/messaging';

const messaging = firebase.messaging();
export default function usePushNotification() {
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
      await getToken();
    } else {
      await requestUserPermission();
    }
  }
  async function requestUserPermission() {
    const authStatus = await messaging.requestPermission();
    const isAuthorized =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (isAuthorized) {
      await getToken();
    }
  }

  async function getToken() {
    const fcmToken = await messaging.getToken();
    console.log('Device FCM Token:', fcmToken);
  }

  return {checkPermission};
}
