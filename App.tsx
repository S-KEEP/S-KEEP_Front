import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator, {DEEPLINK_PREFIX_URL} from './src/navigators/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RecoilRoot} from 'recoil';
import AppSetupWrapper from './src/container/AppSetupContainer';
import Snackbar from './src/components/common/Global/Snackbar/Snackbar';
import Toast from './src/components/common/Global/Toast/Toast';
import usePushNotification from './src/hooks/usePushNotification';
import notifee, {EventType} from '@notifee/react-native';
import {Linking} from 'react-native';

const App = () => {
  usePushNotification();

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      console.log('-->', type, detail);
      switch (type) {
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          const url = (detail.notification?.data as object).url;
          const deepurl = `${DEEPLINK_PREFIX_URL[0]}detail/65` as string;
          console.log(deepurl);
          Linking.openURL(deepurl);
          break;
      }
    });
  });

  return (
    <AppSetupWrapper>
      <SafeAreaProvider>
        <RecoilRoot>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <Navigator />
              <Snackbar />
              <Toast />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </RecoilRoot>
      </SafeAreaProvider>
    </AppSetupWrapper>
  );
};

export default App;
