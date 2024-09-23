import {useEffect} from 'react';
import {displayNotification, messaging} from '../utils/pushUtils';

export default function usePushNotification() {
  useEffect(() => {
    const unsubscribe = messaging.onMessage(async remoteMessage => {
      console.log('Foreground Message: ', remoteMessage);
      displayNotification(remoteMessage);
    });

    messaging.onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging.getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

    return unsubscribe;
  }, []);
}
