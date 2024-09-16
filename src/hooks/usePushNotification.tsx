import {firebase} from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {useEffect} from 'react';

export const messaging = firebase.messaging();

export default function usePushNotification() {
  useEffect(() => {
    const unsubscribe = messaging.onMessage(async remoteMessage => {
      console.log('Foreground Message: ', remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  messaging.setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}
