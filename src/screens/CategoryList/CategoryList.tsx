import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '../../navigators/types';
import {styles} from './CategoryList.style';
import {IcDelete, IcLeft, IcRoundEtc} from '../../assets/icon';
import {
  COLOR_DETAIL_MAP,
  ICON_DETAIL_MAPS,
} from '../../constants/components/CategoryCard';
import {theme} from '../../styles';
import {wrapper} from '../../styles/common';
import PlaceDetail from '../../components/common/PlaceDetail/PlaceDetail';
import useGetCategoryList from '../../hooks/queries/category/useGetCategoryDetail';
import {UserLocation} from '../../types/dtos/location';
import {useDeleteCategory} from '../../hooks/mutations/category/useDeleteCategory';
import {useQueryClient} from '@tanstack/react-query';
import {CATEGORY_KEYS} from '../../hooks/queries/QueryKeys';
import EmptyCategoryList from '../../components/Category/EmptyCategoryList';
import Modal from '../../components/common/Modal/Modal';
import Icon from '../../components/common/Icon/Icon';

type CategoryListProps = StackScreenProps<'CategoryList'>;

export default function CategoryList({navigation, route}: CategoryListProps) {
  const {id} = route.params;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {mutate: deleteCategory} = useDeleteCategory();
  const {data, loadMore, isFetching, hasNextPage, totalElement, category} =
    useGetCategoryList({
      userCategoryId: id,
      page: 1,
    });

  const backgroundColor = useMemo(() => {
    return COLOR_DETAIL_MAP[category?.name as string] || theme.palette.gray1;
  }, [category]);

  const IconComponent = useMemo(() => {
    return ICON_DETAIL_MAPS[category?.name as string] || IcRoundEtc;
  }, [category]);

  const renderItem = ({item}: {item: UserLocation}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {id: item.id})}>
      <PlaceDetail
        title={item.location.placeName}
        description={item.location.roadAddress}
        imageSrc={item.photoUrl}
      />
    </TouchableOpacity>
  );

  function handleGoBack() {
    navigation.goBack();
  }
  function handleDeleteCategory() {
    const userCategoryId = id;
    deleteCategory(
      {userCategoryId},
      {
        onSuccess: () => {
          navigation.navigate('TabNavigator');
          queryClient.invalidateQueries({
            queryKey: CATEGORY_KEYS.all,
          });
        },
        onError: error => {
          console.error('카테고리 삭제 실패 :', error);
        },
      },
    );
  }

  return (
    <SafeAreaView style={{...wrapper}}>
      <View style={[styles.topContainer, {backgroundColor}]}>
        <View style={styles.header}>
          <Icon
            onPress={handleGoBack}
            children={<IcLeft />}
            style={{paddingVertical: 5}}
          />

          <Icon
            onPress={() => setModalVisible(true)}
            children={<Text>삭제</Text>}
          />
        </View>

        <View style={styles.category}>
          <View style={styles.icon}>
            <IconComponent />
          </View>

          <Text style={styles.headerTitle}>{category?.name}</Text>
          <Text style={styles.headerDescription}>{category?.description}</Text>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={hasNextPage ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? (
            <ActivityIndicator size="large" color={theme.palette.primary} />
          ) : null
        }
        ListHeaderComponent={
          data && data.length > 0 ? (
            <Text style={styles.itemCount}>총 {totalElement}개</Text>
          ) : (
            <View style={{height: 50}} />
          )
        }
        ListEmptyComponent={EmptyCategoryList}
      />

      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteCategory}
        IconComponent={<IcDelete style={styles.modalIcon} />}
        modalTitle="카테고리를 삭제하시겠어요?"
        modalSubtitle={`삭제하면 다시 복구할 수 없어요!`}
        modalButtonCancelText="놔둘래요"
        modalButtonConfirmText="삭제할래요"
      />
    </SafeAreaView>
  );
}
