import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '../../navigators/types';
import {styles} from './CategoryListScreen.style';
import {IcCategoryRest} from '../../assets/icon';
import {COLOR_MAP, ICON_MAPS} from '../../constants/components/CategoryCard';
import {theme} from '../../styles';
import useGetCategoryList, {
  IUserLocation,
} from '../../hooks/queries/category/useGetCategoryDetail';
import PlaceDetail from '../../components/Detail/PlaceDetail/PlaceDetail';

type CategoryListProps = StackScreenProps<'CategoryListScreen'>;

export default function CategoryListScreen({route}: CategoryListProps) {
  const {title, description} = route.params;

  const backgroundColor = COLOR_MAP[title] || theme.palette.gray1;
  const IconComponent = ICON_MAPS[title] || IcCategoryRest;

  const {data, loadMore, isFetching, hasNextPage} = useGetCategoryList({
    userCategory: title,
    page: 1,
  });

  console.log('타이틀 흠냐', title);

  const renderItem = ({item}: {item: IUserLocation}) => (
    <PlaceDetail
      title={item.location.placeName}
      description={item.location.roadAddress}
      imageSrc={item.photoUrl} // Adjust if you need to transform or process image URL
    />
  );

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, {backgroundColor}]}>
        <View style={styles.icon}>
          <IconComponent />
        </View>

        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerDescription}>{description}</Text>
      </View>

      <Text style={styles.itemCount}>총 개</Text>

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
    </View>
  );
}
