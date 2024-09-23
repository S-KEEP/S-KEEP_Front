import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigators/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RecoilRoot} from 'recoil';
import AppSetupWrapper from './src/container/AppSetupContainer';
import Snackbar from './src/components/common/Global/Snackbar/Snackbar';
import Toast from './src/components/common/Global/Toast/Toast';
import usePushNotification from './src/hooks/usePushNotification';
import notifee, {EventType} from '@notifee/react-native';
import {linkUrl} from './src/utils/pushUtils';

const App = () => {
  usePushNotification();

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      console.log('onForegroundEvent', type, detail);

      if (type === EventType.PRESS) {
        const url = detail.notification?.data?.url as string;
        if (url) {
          console.log('url', url);
          linkUrl(url);
        }
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
