import {useEffect, useCallback, useRef, useState} from 'react';
import ShareMenu from 'react-native-share-menu';
import {ShareData} from 'react-native-share-menu';
import useNavigator from '../navigators/hooks/useNavigator';

/**
 * Share Extension
 */
export default function useShareExtension() {
  const {stackNavigation} = useNavigator();

  const [isForegroundProcessed, setIsForegroundProcessed] = useState(false);

  const handleShare = useCallback(
    (type: 'FOREGROUND' | 'BACKGROUND', item: ShareData | undefined) => {
      console.log(`[${type}] `, item);
      if (!item) {
        return;
      }

      const formData = new FormData();
      if (item?.data?.length === 1) {
        const imagePath = item.data[0].data;
        const fileName = imagePath.split('/').pop();

        const photo = {
          uri: imagePath,
          type: 'multipart/form-data',
          name: `${fileName}`,
        };

        formData.append(`file`, photo);

        console.log(`[${type}] `, item);
        console.log('[TabNavigator] FormData ', formData);
        stackNavigation.navigate('Analyze', {formData});
      }
    },
    [],
  );

  useEffect(() => {
    // Background
    ShareMenu.getInitialShare(item => {
      if (!isForegroundProcessed) {
        handleShare('BACKGROUND', item);
      }
    });

    // Foreground
    const listener = ShareMenu.addNewShareListener(item => {
      setIsForegroundProcessed(true);
      handleShare('FOREGROUND', item);
    });

    console.log('listener', listener);
    return () => {
      listener.remove();
    };
  }, [isForegroundProcessed]);
}
