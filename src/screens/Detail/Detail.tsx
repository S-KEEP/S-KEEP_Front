import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, padding, wrapper, wrapperFull} from '../../styles/common';
import {IcCancel} from '../../assets/icon';
import {StackScreenProps} from '../../navigators/types';
import Map from '../../components/Detail/Map/Map';
import {useGetLocation} from '../../hooks/queries/location/useGetLocation';
import ModifyButton from '../../components/common/Button/ModifyButton';
import CategoryBottomSheet, {
  CategoryBottomSheetRef,
} from '../../components/common/BottomSheet/CategoryBottomSheet/CategoryBottomSheet';
import {useRef} from 'react';
import CategoryItem from '../../components/common/Category/CategoryItem/CategoryItem';
import {Category} from '../../types/dtos/location';
import PlaceDetail from '../../components/Detail/PlaceDetail/PlaceDetail';

type DetailProps = StackScreenProps<'Detail'>;
export default function Detail({navigation, route}: DetailProps) {
  const {id} = route.params;

  const {data: location, isLoading, isError} = useGetLocation(id);
  const bottomSheetRef = useRef<CategoryBottomSheetRef>(null);

  // [TODO] 처리
  if (isLoading || isError || !location) {
    return <SafeAreaView style={{...wrapperFull}}></SafeAreaView>;
  }

  function handleOnModify(category: Category) {
    console.log('New Category!', category);

    // validataion - 기존과 같은지 비교
  }

  return (
    <SafeAreaView style={{...wrapperFull}}>
      <IcCancel onPress={() => navigation.pop()} style={{...padding}} />

      <Map x={location?.location.x} y={location.location.y} />

      <PlaceDetail
        imageSrc={location?.photoUrl}
        title={String(location.location.placeName)}
        description={String(location.location.roadAddress)}
      />

      <View style={styles.categoryBox}>
        <CategoryItem category={location.userCategory} />
        <ModifyButton onPress={() => bottomSheetRef.current?.open()} />
      </View>

      <CategoryBottomSheet ref={bottomSheetRef} onModify={handleOnModify} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoryBox: {
    ...flexBox('row', 'flex-start'),
    ...padding,
    paddingVertical: 20,

    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
});
