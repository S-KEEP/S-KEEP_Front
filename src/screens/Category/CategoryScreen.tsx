import {View, Button, Text} from 'react-native';
import {useCallback, useMemo, useRef} from 'react';
import CategorySelector from '../../components/common/BottomSheet/CategorySelector';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import styles from './CategoryScreen.style';
import { CARD_DATA } from '../../constants/components/CategoryCard';
import Card from '../../components/common/CategoryCard/CategoryCard';

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
      <Text style={styles.title}>
        나만의 카테고리로 {'\n'}
        명소를 기록해봐요
      </Text>
      {CARD_DATA.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          IconComponent={card.IconComponent}
        />
      ))}
    </View>
  );
}
