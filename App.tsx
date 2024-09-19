import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigators/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RecoilRoot} from 'recoil';
import AppSetupWrapper from './src/container/AppSetupContainer';
import Snackbar from './src/components/common/Global/Snackbar/Snackbar';
import Toast from './src/components/common/Global/Toast/Toast';
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {StackParamList} from './src/navigators/types';
import {lightPalette} from './src/styles';

const linking: LinkingOptions<StackParamList> = {
  prefixes: ['kakao378c5d01c3e4b03529594678b0a76911://'],
  config: {
    screens: {
      TabNavigator: {
        screens: {
          SettingTab: {
            path: 'kakaolink',
          },
        },
      },
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, ...lightPalette},
};

const App = () => {
  return (
    <AppSetupWrapper>
      <SafeAreaProvider>
        <RecoilRoot>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <NavigationContainer linking={linking} theme={theme}>
                <Navigator />
              </NavigationContainer>
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
