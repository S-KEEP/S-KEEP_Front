// src/utils/pushUtils.ts

import {
  firebase,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {Notification} from '@notifee/react-native';
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
    const parsedData = parseNotificationData(data?.data);

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
export async function linkToDeepLinkURL(deepLinkURL: string) {
  console.log('🚀 DEEPLINK - ', deepLinkURL);

  try {
    await Linking.openURL(deepLinkURL);
  } catch (error) {
    console.error('Failed to open deep link:', error);
  }
}

/**
 * getDeepLinkUrl
 * notification에서 deeplink url 추출
 */
export function getDeepLinkUrl(notification?: Notification) {
  try {
    const url = notification?.data?.url as string;
    if (!url) throw new Error('url이 존재하지 않습니다.');

    return getDeepLinkUrlFromUrl(url);
  } catch (e) {
    console.error(e);
  }
}

/**
 * getDeepLinkUrlFromUrl
 * deeplinkurl 생성
 */
export function getDeepLinkUrlFromUrl(url?: string) {
  try {
    if (!url) throw new Error('url이 존재하지 않습니다.');

    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    const deepurl = `${DEEPLINK_PREFIX_URL[0]}${cleanUrl}`;

    return deepurl;
  } catch (e) {
    console.error(e);
  }
}

/**
 * parseNotificationData
 */
export function parseNotificationData(data: string | object | undefined) {
  try {
    return JSON.parse(data as string);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 카테고리 타입 별 이름 변환해 주는 함수
 * @param type
 */
export function getCategoryName(type: string) {
  if (type === 'userLocation') return '날짜 추천 받고 여행 떠나기';
  else if (type === 'category') return '카테고리 리마인드';
  else type;
}

/**
 * ISO Date를 포맷팅해 주는 함수
 * @param isoString
 */
export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) throw new Error('Invalid date');

    const today = new Date();
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    if (isToday) {
      return '오늘';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  } catch (error) {
    return isoString;
  }
}
