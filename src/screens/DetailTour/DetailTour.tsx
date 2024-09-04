import {
  ActivityIndicator,
  DeviceEventEmitter,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {padding, wrapperFull} from '../../styles/common';
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
import {useRef, useState} from 'react';
import {ICategory} from '../../types/dtos/location';
import {theme} from '../../styles';
import {styles} from './DetailTour.styles';

type DetailTourProps = StackScreenProps<'DetailTour'>;
export default function DetailTour({navigation, route}: DetailTourProps) {
  const {location} = route.params;

  const bottomSheetRef = useRef<CategoryBottomSheetRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {mutate: addCategory} = usePostTourLocation({
    onSuccess(res, variables) {
      console.log(res, variables);

      // 카테고리 추가 성공 후,
      //  토스트 노출 & 카테고리 메인으로 이동
      setIsLoading(false);

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
        id: category.id,
      });
    },
    onError(e) {
      console.error(e);

      setIsLoading(false);
      DeviceEventEmitter.emit('openToast', {
        content: (
          <Text style={styles.snackbarText}>여행지 저장에 실패했습니다</Text>
        ),
      });
    },
  });

  function handleAddCategory(category: ICategory) {
    console.log(category);

    bottomSheetRef.current?.close();
    setIsLoading(true);
    addCategory({tourLocation: location, category: category});
  }

  return (
    <SafeAreaView style={{...wrapperFull, paddingBottom: 0}}>
      <>
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
      </>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.palette.primary} />
        </View>
      )}
    </SafeAreaView>
  );
}
