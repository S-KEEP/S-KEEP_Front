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
import Icon from '../../components/common/Icon/Icon';
import PlaceDetail from '../../components/common/PlaceDetail/PlaceDetail';
import {styles} from './EditorDetail.style';
import {usePostEditorLocationAdd} from '../../hooks/mutations/category/useEditorCategoryAdd';

type DetailTourProps = StackScreenProps<'EditorDetail'>;
export default function EditorDetail({navigation, route}: DetailTourProps) {
  const {location} = route.params;

  const bottomSheetRef = useRef<CategoryBottomSheetRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {mutate: addCategory} = usePostEditorLocationAdd({
    onSuccess(res, variables) {
      console.log(res, variables);
      setIsLoading(false);

      const {userCategoryId, title} = variables;
      DeviceEventEmitter.emit('openToast', {
        content: (
          <View style={styles.snackbar}>
            <IcCheck />
            <Text style={styles.snackbarText}>{title}을 저장했어요.</Text>
          </View>
        ),
      });

      navigation.replace('CategoryList', {
        id: userCategoryId,
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
    addCategory({title: location.title, userCategoryId: category.id});
  }

  return (
    <SafeAreaView
      style={{...wrapperFull, paddingBottom: 30, position: 'relative'}}>
      <>
        <Icon
          onPress={() => navigation.pop()}
          children={<IcCancel />}
          style={{...padding}}
        />

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
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <Button
            text="카테고리에 추가"
            onPress={() => bottomSheetRef.current?.open()}
          />
        </View>

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
