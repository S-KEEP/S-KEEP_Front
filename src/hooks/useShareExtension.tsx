import {useEffect, useCallback, useRef, useState} from 'react';
import ShareMenu from 'react-native-share-menu';
import {ShareData} from 'react-native-share-menu';
import useNavigator from '../navigators/hooks/useNavigator';
import useAnalyze from './useAnalyze';

/**
 * Share Extension
 */
export default function useShareExtension() {
  const {handleShareExtension} = useAnalyze();
  const [isForegroundProcessed, setIsForegroundProcessed] = useState(false);

  const handleShare = useCallback(
    (type: 'FOREGROUND' | 'BACKGROUND', item: ShareData | undefined) => {
      console.log(`[${type}] `, item);
      if (!item) {
        return;
      }

      handleShareExtension(item);
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
