import {
  DeviceEventEmitter,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, padding, wrapperFull} from '../../styles/common';
import {IcCancel, IcCheck} from '../../assets/icon';
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
import {theme} from '../../styles';

type DetailTourProps = StackScreenProps<'DetailTour'>;
export default function DetailTour({navigation, route}: DetailTourProps) {
  const {location} = route.params;

  const bottomSheetRef = useRef<CategoryBottomSheetRef>(null);

  const {mutate: addCategory} = usePostTourLocation({
    onSuccess(res, variables) {
      console.log(res, variables);

      // 카테고리 추가 성공 후,
      // 바텀시트 닫고 & 토스트 노출 & 카테고리 메인으로 이동
      bottomSheetRef.current?.close();

      const {tourLocation, category} = variables;
      DeviceEventEmitter.emit('openToast', {
        content: (
          <View style={styles.snackbar}>
            <IcCheck />
            <Text style={styles.snackbarText}>
              {tourLocation.title}을 {category.name}에 저장했어요.
            </Text>
          </View>
        ),
      });

      navigation.replace('CategoryList', {
        title: category.name,
        description: category.description,
      });
    },
    onError(e) {
      console.error(e);
    },
  });

  function handleAddCategory(category: ICategory) {
    console.log(category);
    addCategory({tourLocation: location, category: category});
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

        <Weather
          location={{
            x: location.mapX,
            y: location.mapY,
            address: location.address,
          }}
        />

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
  snackbar: {
    ...flexBox(),
    gap: 10,
    width: '100%',
  },
  snackbarText: {
    ...theme.typography.text_m_13,
    color: theme.palette.white,
  },
});
