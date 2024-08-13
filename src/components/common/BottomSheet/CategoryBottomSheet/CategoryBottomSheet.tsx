import React, {useCallback, useMemo, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CategorySelector from './CategorySelector';

export default function CategoryBottomSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      containerStyle={{backgroundColor: '#000000C4'}}>
      <CategorySelector />
    </BottomSheetModal>
  );
}
