import {View, Button} from 'react-native';
import {useCallback, useMemo, useRef} from 'react';
import CategorySelector from '../../components/common/BottomSheet/CategorySelector';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import styles from './CategoryScreen.style';

export default function Category() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '60%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  return (
    <View style={styles.container}>
      <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        <View style={styles.contentContainer}>
          <CategorySelector />
        </View>
      </BottomSheetModal>
    </View>
  );
}
