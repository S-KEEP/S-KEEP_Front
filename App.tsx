import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigators/Navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
};

export default App;
