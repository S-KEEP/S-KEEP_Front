import {View, Button, StyleSheet, Text} from 'react-native';
import {useCallback, useMemo, useRef} from 'react';
import CategorySelector from '../../components/common/BottomSheet/CategorySelector';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import styles from './CategoryScreen.style';
import AppleLogin from '../../components/Login/AppleLogin';

export default function Category() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '60%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  //모달 배경 누르면 닫히기
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
      <AppleLogin />
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
