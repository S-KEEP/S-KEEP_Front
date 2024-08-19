import {useEffect, useCallback} from 'react';
import ShareMenu from 'react-native-share-menu';
import {ShareData} from 'react-native-share-menu';

/**
 * Share Extension
 */
export default function useShareExtension() {
  const handleShare = useCallback(
    (type: string, item: ShareData | undefined) => {
      console.log(`[${type}] `, item);
      if (!item) {
        return;
      }
    },
    [],
  );

  // Background
  useEffect(() => {
    ShareMenu.getInitialShare(item => handleShare('BACKGROUND', item));
  }, []);

  // Foreground
  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(item =>
      handleShare('FOREGROUND', item),
    );

    console.log('listener', listener);
    return () => {
      listener.remove();
    };
  }, []);
}
