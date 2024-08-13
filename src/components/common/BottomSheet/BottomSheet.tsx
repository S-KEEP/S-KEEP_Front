import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

/**
 * Custom Bottom Sheet Modal
 * @author yooshin kim
 */

export interface BottomSheetModalRef {
  open: () => void;
  close: () => void;
}

export interface BottomSheetModalProps {
  children: React.ReactNode;
}

const BottomSheet = forwardRef<BottomSheetModalRef, BottomSheetModalProps>(
  ({children}, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetModalRef.current?.present(),
      close: () => bottomSheetModalRef.current?.close(),
    }));

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '50%']}
        containerStyle={{backgroundColor: '#000000C4'}}>
        {children}
      </BottomSheetModal>
    );
  },
);

export default BottomSheet;
