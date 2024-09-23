import {useEffect} from 'react';
import {
  displayNotification,
  getDeepLinkUrl,
  getDeepLinkUrlFromUrl,
  linkToDeepLinkURL,
  messaging,
  parseNotificationData,
} from '../utils/pushUtils';

export default function usePushNotification() {
  useEffect(() => {
    const unsubscribe = messaging.onMessage(async remoteMessage => {
      console.log('Foreground Message: ', remoteMessage);
      displayNotification(remoteMessage);
    });

    messaging.onNotificationOpenedApp(remoteMessage => {
      console.log('background state:', remoteMessage);

      const parsedData = parseNotificationData(remoteMessage?.data?.data);
      const deepLinkURL = getDeepLinkUrlFromUrl(parsedData.url);
      if (deepLinkURL) {
        console.log('url', deepLinkURL);
        linkToDeepLinkURL(deepLinkURL);
      }
    });

    messaging.getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('quit state:', remoteMessage);

        const parsedData = parseNotificationData(remoteMessage?.data?.data);
        const deepLinkURL = getDeepLinkUrlFromUrl(parsedData.url);
        if (deepLinkURL) {
          console.log('url', deepLinkURL);
          linkToDeepLinkURL(deepLinkURL);
        }
      }
    });

    return unsubscribe;
  }, []);
}
