import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {flexBox, padding, wrapperFull} from '../../styles/common';
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
import {ICategory} from '../../types/dtos/location';
import PlaceDetail from '../../components/Detail/PlaceDetail/PlaceDetail';
import {usePatchLocation} from '../../hooks/mutations/location/usePatchLocation';
import {useQueryClient} from '@tanstack/react-query';
import {LOCATION_KEYS} from '../../hooks/queries/QueryKeys';
import SkeletonCategoryItem from '../../components/common/Category/CategoryItem/SkeletonCategoryItem';
import SkeletonPlaceDetail from '../../components/common/PlaceDetail/SkeletonPlaceDetail';
import Button from '../../components/common/Button/Button';
import ErrorView from '../../components/ErrorView/ErrorView';
import Tourism from '../../components/common/Tourism/Tourism';
import {theme} from '../../styles';
import Weather from '../../components/common/Weather/Weather';

type DetailProps = StackScreenProps<'Detail'>;
export default function Detail({navigation, route}: DetailProps) {
  const {id} = route.params;

  const {data: location, isLoading, isError} = useGetLocation(id);
  const bottomSheetRef = useRef<CategoryBottomSheetRef>(null);

  const queryClient = useQueryClient();
  const {mutate: modify} = usePatchLocation({
    onSuccess: (res, variables) => {
      const {errorCode, message, result} = res;

      if (errorCode) {
        console.error(`${errorCode} - ${message}`);
        navigation.pop();
        return;
      }

      console.log('[Modify] ', res.result, variables);
      queryClient.invalidateQueries({
        queryKey: LOCATION_KEYS.detail(String(id)),
      });
      bottomSheetRef.current?.close();
    },
    onError: e => {
      console.error('[Modify] ', e);
    },
  });

  if (isLoading) {
    return (
      <SafeAreaView style={{...wrapperFull}}>
        <IcCancel onPress={() => navigation.pop()} style={{...padding}} />
        <Map x={'127.0016985'} y={'37.413294'} />

        <SkeletonPlaceDetail />

        <View style={styles.categoryBox}>
          <SkeletonCategoryItem />
          <ModifyButton onPress={() => {}} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !location) {
    return (
      <SafeAreaView
        style={{
          ...wrapperFull,
          paddingTop: 120,
          paddingBottom: 80,
          paddingHorizontal: 30,
        }}>
        <ErrorView
          title="오류가 발생했습니다"
          description="정보를 불러오는 데 실패했어요"
          buttons={
            <Button gray text="돌아가기" onPress={() => navigation.goBack()} />
          }
        />
      </SafeAreaView>
    );
  }

  function handleOnModify(category: ICategory) {
    const currentCategory = location?.userCategory;
    console.log('기존 - ', currentCategory);
    console.log('New Category!', category);

    if (!currentCategory) return;
    if (currentCategory.id === category.id) {
      console.log('동일한 카테고리');
      bottomSheetRef.current?.close();
    }

    modify({
      userLocationId: location.id,
      userCategoryId: category.id,
      userCategory: category,
    });
  }

  return (
    <SafeAreaView style={{...wrapperFull, paddingBottom: 0}}>
      <IcCancel onPress={() => navigation.pop()} style={{...padding}} />

      <Map x={location?.location.x} y={location.location.y} />

      <ScrollView>
        <PlaceDetail
          imageSrc={location?.photoUrl}
          title={String(location.location.placeName)}
          description={String(location.location.roadAddress)}
        />

        <View style={styles.categoryBox}>
          <CategoryItem category={location.userCategory} />
          <ModifyButton onPress={() => bottomSheetRef.current?.open()} />
        </View>

        <Tourism
          name={location.location.placeName}
          location={{x: location.location.x, y: location.location.y}}
        />

        <Weather location={{x: location.location.x, y: location.location.y}} />
      </ScrollView>

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
  scrollViewWrapper: {},
});
