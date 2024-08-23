import React from 'react';
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
import {IcLeft, IcCategoryRest} from '../../assets/icon';
import {COLOR_MAP, ICON_MAPS} from '../../constants/components/CategoryCard';
import {theme} from '../../styles';
import {wrapper} from '../../styles/common';
import PlaceDetail from '../../components/common/PlaceDetail/PlaceDetail';
import useGetCategoryList from '../../hooks/queries/category/useGetCategoryDetail';
import {UserLocation} from '../../types/dtos/location';

type CategoryListProps = StackScreenProps<'CategoryList'>;

export default function CategoryList({navigation, route}: CategoryListProps) {
  const {title, description} = route.params;

  const backgroundColor = COLOR_MAP[title] || theme.palette.gray1;
  const IconComponent = ICON_MAPS[title] || IcCategoryRest;

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

  return (
    <SafeAreaView style={{...wrapper}}>
      <View style={styles.backIcon}>
        <IcLeft onPress={handleGoBack} />
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
      />
    </SafeAreaView>
  );
}
