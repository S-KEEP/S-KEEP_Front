import {useEffect} from 'react';
import {displayNotification, messaging} from '../utils/pushUtils';

export default function usePushNotification() {
  useEffect(() => {
    const unsubscribe = messaging.onMessage(async remoteMessage => {
      console.log('Foreground Message: ', remoteMessage);
      displayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  messaging.setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}
