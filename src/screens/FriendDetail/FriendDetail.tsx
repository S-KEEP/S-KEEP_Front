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
import CategoryBottomSheet, {
  CategoryBottomSheetRef,
} from '../../components/common/BottomSheet/CategoryBottomSheet/CategoryBottomSheet';
import {useRef, useState} from 'react';
import CategoryItem from '../../components/common/Category/CategoryItem/CategoryItem';
import {ICategory} from '../../types/dtos/location';
import {useQueryClient} from '@tanstack/react-query';
import SkeletonPlaceDetail from '../../components/common/PlaceDetail/SkeletonPlaceDetail';
import Button from '../../components/common/Button/Button';
import ErrorView from '../../components/ErrorView/ErrorView';
import Tourism from '../../components/common/Tourism/Tourism';
import {theme} from '../../styles';
import Weather from '../../components/common/Weather/Weather';
import Icon from '../../components/common/Icon/Icon';
import {useGetFriendLocation} from '../../hooks/queries/friends/useGetFriendLocation';

import PlaceDetail from '../../components/common/PlaceDetail/PlaceDetail';
import {styles} from './FriendDetail.style';
import {usePostFriendLocationAdd} from '../../hooks/mutations/friend/usePostFriendLocationAdd';

type DetailProps = StackScreenProps<'FriendDetail'>;
export default function FriendDetail({navigation, route}: DetailProps) {
  const {id, targetId} = route.params;
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const bottomSheetRef = useRef<CategoryBottomSheetRef>(null);
  const {
    data: location,
    isLoading,
    isError,
  } = useGetFriendLocation({
    userLocationId: id,
    targetId: targetId,
  });

  const queryClient = useQueryClient();
  const {mutate: addCategory} = usePostFriendLocationAdd({
    onSuccess(res, variables) {
      console.log(res, variables);

      // 카테고리 추가 성공 후,
      //  토스트 노출 & 카테고리 메인으로 이동
      setIsLoadingBottom(false);

      const {targetId, targetLocationId, userCategoryId} = variables;
      console.log('🚀 체크하세요,', targetId, targetLocationId);
      DeviceEventEmitter.emit('openToast', {
        content: (
          <View style={styles.snackbar}>
            <IcCheck />
            <Text style={styles.snackbarText}>여행지 저장에 성공했어요!</Text>
          </View>
        ),
      });

      navigation.replace('CategoryList', {
        id: userCategoryId,
      });
    },
    onError(e) {
      console.error(e);

      setIsLoadingBottom(false);
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
    setIsLoadingBottom(true);
    addCategory({
      targetId: targetId,
      targetLocationId: id,
      userCategoryId: category.id,
    });
  }

  if (isLoading) {
    return (
      <SafeAreaView style={{...wrapperFull}}>
        <Icon
          onPress={() => navigation.pop()}
          children={<IcCancel />}
          style={{...padding}}
        />

        <Map x={'127.0016985'} y={'37.413294'} />

        <SkeletonPlaceDetail />
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

  return (
    <SafeAreaView style={{...wrapperFull, paddingBottom: 0}}>
      <View style={styles.header}>
        <Icon onPress={() => navigation.pop()} children={<IcCancel />} />
      </View>

      <Map x={location?.location.x} y={location.location.y} />

      <ScrollView>
        <PlaceDetail
          imageSrc={location?.photoUrl}
          title={String(location.location.placeName)}
          description={String(location.location.roadAddress)}
        />

        <View style={styles.categoryBox}>
          <CategoryItem category={location.userCategory} />
        </View>

        <Tourism
          name={location.location.placeName}
          location={{x: location.location.x, y: location.location.y}}
        />

        <Weather
          location={{
            x: location.location.x,
            y: location.location.y,
            address: location.location.roadAddress,
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
      {isLoadingBottom && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.palette.primary} />
        </View>
      )}
    </SafeAreaView>
  );
}
