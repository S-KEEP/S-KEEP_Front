import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {padding, wrapperFull} from '../../styles/common';
import {IcCancel} from '../../assets/icon';
import {StackScreenProps} from '../../navigators/types';
import Map from '../../components/Detail/Map/Map';
import PlaceDetail from '../../components/Detail/PlaceDetail/PlaceDetail';
import Tourism from '../../components/common/Tourism/Tourism';
import Weather from '../../components/common/Weather/Weather';
import Button from '../../components/common/Button/Button';
import {usePostTourLocation} from '../../hooks/mutations/location/usePostTourLocation';
import CategoryBottomSheet, {
  CategoryBottomSheetRef,
} from '../../components/common/BottomSheet/CategoryBottomSheet/CategoryBottomSheet';
import {useRef} from 'react';
import {ICategory} from '../../types/dtos/location';

type DetailTourProps = StackScreenProps<'DetailTour'>;
export default function DetailTour({navigation, route}: DetailTourProps) {
  const {location} = route.params;

  const bottomSheetRef = useRef<CategoryBottomSheetRef>(null);

  const {mutate: addCategory} = usePostTourLocation({
    onSuccess(res) {
      console.log(res);

      // 카테고리 추가 성공 후, 바텀시트 닫고
      // 토스트 노출
      // 카테고리 메인으로 이동
    },
    onError(e) {
      console.error(e);
    },
  });

  function handleAddCategory(category: ICategory) {
    console.log(category);
    addCategory({tourLocation: location});
  }

  return (
    <SafeAreaView style={{...wrapperFull, paddingBottom: 0}}>
      <IcCancel onPress={() => navigation.pop()} style={{...padding}} />

      <Map x={location.mapX} y={location.mapY} />

      <ScrollView>
        <PlaceDetail
          imageSrc={location.imageUrl}
          title={String(location.title)}
          description={String(location.address)}
        />

        <Tourism
          name={location.title}
          location={{x: location.mapX, y: location.mapY}}
        />

        <Weather location={{x: location.mapX, y: location.mapY}} />

        <View style={styles.buttonWrapper}>
          <Button
            text="카테고리에 추가"
            onPress={() => bottomSheetRef.current?.open()}
          />
        </View>
      </ScrollView>

      <CategoryBottomSheet
        ref={bottomSheetRef}
        title="저장할 카테고리를 선택해 주세요!"
        action="저장하기"
        onModify={handleAddCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '80%',
    margin: 'auto',
  },
});
