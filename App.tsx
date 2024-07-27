import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigators/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Button, Image, Text, View} from 'react-native';
import ShareMenu, {ShareMenuReactView} from 'react-native-share-menu';
import {ShareData} from 'react-native-share-menu';

type SharedItem = {
  mimeType: string;
  data: string;
  extraData: any;
};

const App = () => {
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');

  const handleShare = useCallback((item: ShareData | undefined) => {
    console.log('item', item);
    if (!item) {
      return;
    }

    const {mimeType, data, extraData} = item;

    // setSharedData(data);
    // setSharedMimeType(mimeType);
    // You can receive extra data from your custom Share View
    console.log(mimeType);
    console.log(data);
  }, []);

  // useEffect(() => {
  //   ShareMenu.getInitialShare(handleShare);
  // }, []);

  // Foreground
  useEffect(() => {
    console.log('here');
    const listener = ShareMenu.addNewShareListener(share => handleShare(share));

    console.log('listener', listener);
    return () => {
      listener.remove();
    };
  }, []);

  // if (!sharedMimeType && !sharedData) {
  //   // The user hasn't shared anything yet
  //   return null;
  // }

  if (sharedMimeType === 'text/plain') {
    // The user shared text
    return <Text>Shared text: {sharedData}</Text>;
  }

  if (sharedMimeType.startsWith('image/')) {
    // The user shared an image
    return (
      <View>
        <Text>Shared image:</Text>
        {/* <Image uri={} /> */}
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <Navigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
