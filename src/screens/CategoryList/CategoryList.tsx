import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackScreenProps} from '../../navigators/types';
import {styles} from './CategoryList.style';
import {IcEmpty, IcLeft, IcRoundEtc} from '../../assets/icon';
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
import useAnalyze from '../../hooks/useAnalyze';
import EmptyCategoryList from '../../components/Category/EmptyCategoryList';

type CategoryListProps = StackScreenProps<'CategoryList'>;

export default function CategoryList({navigation, route}: CategoryListProps) {
  const {title, description} = route.params;
  const {handleGoToGallery} = useAnalyze();

  const backgroundColor = COLOR_DETAIL_MAP[title] || theme.palette.gray1;
  const IconComponent = ICON_DETAIL_MAPS[title] || IcRoundEtc;

  const {data, loadMore, isFetching, hasNextPage, totalElement} =
    useGetCategoryList({
      userCategory: title,
      page: 1,
    });

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
    navigation.navigate('TabNavigator');
  }

  const {mutate: deleteCategory} = useDeleteCategory();
  const queryClient = useQueryClient();

  function handleDeleteCategory() {
    if (data && data.length > 0) {
      const userCategoryId = data[0].userCategory.id;

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
            console.error('Failed to delete category:', error);
          },
        },
      );
    }
  }

  return (
    <SafeAreaView style={{...wrapper}}>
      <View style={styles.backIcon}>
        <IcLeft onPress={handleGoBack} />
        <TouchableOpacity onPress={handleDeleteCategory}>
          <Text>삭제</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.headerContainer, {backgroundColor}]}>
        <View style={styles.icon}>
          <IconComponent />
        </View>

        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerDescription}>{description}</Text>
      </View>

      <Text style={styles.itemCount}>총 {totalElement}개</Text>

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
        ListEmptyComponent={EmptyCategoryList}
      />
    </SafeAreaView>
  );
}
