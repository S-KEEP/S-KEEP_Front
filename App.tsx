import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigators/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RecoilRoot} from 'recoil';
import AppSetupWrapper from './src/container/AppSetupContainer';

const App = () => {
  return (
    <AppSetupWrapper>
      <SafeAreaProvider>
        <RecoilRoot>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <Navigator />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </RecoilRoot>
      </SafeAreaProvider>
    </AppSetupWrapper>
  );
};

export default App;
