// src/utils/pushUtils.ts

import {
  firebase,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {Linking} from 'react-native';
import {DEEPLINK_PREFIX_URL} from '../navigators/Linking';

export const messaging = firebase.messaging();

/**
 * checkPermission
 * 알림 권한 확인 후, FCM token 요청
 */
export async function checkPermission() {
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
  const apnsToken = await messaging.getAPNSToken();
  console.log('Device APNS Token:', apnsToken);

  const fcmToken = await messaging.getToken();
  console.log('Device FCM Token:', fcmToken);

  return fcmToken;
}

/**
 * displayNotification
 * 네이티브 푸시 전송
 */
export async function displayNotification(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'SKEEP',
  });

  const {notification, data} = message;
  console.log('>>data', data?.data);
  try {
    const parsedData = JSON.parse(data?.data as string);

    await notifee.displayNotification({
      title: notification?.title,
      body: notification?.body,
      data: parsedData,
      ios: {
        sound: 'default',
      },
    });
  } catch (error) {
    console.error('Failed to parse notification data:', error);
  }
}

/**
 * linkUrl
 * 딥링크 랜딩 로직 수행
 */
export async function linkUrl(url: string) {
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  const deepurl = `${DEEPLINK_PREFIX_URL[0]}${cleanUrl}`;
  console.log('🚀 DEEPLINK - ', deepurl);

  try {
    await Linking.openURL(deepurl);
  } catch (error) {
    console.error('Failed to open deep link:', error);
  }
}
