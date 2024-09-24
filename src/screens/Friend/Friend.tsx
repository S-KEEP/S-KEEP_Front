import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetFriendCategoryList} from '../../hooks/queries/friends/useGetFriendCategory';
import {UserCategory, UserLocation} from '../../types/dtos/category';
import {StackScreenProps} from '../../navigators/types';
import {ICON_FRIEND_MAPS} from '../../constants/components/CategoryCard';
import {IcFriendDelete, IcLeft} from '../../assets/icon';
import {styles} from './Friend.style';
import useGetFriendCategoryDetail from '../../hooks/queries/friends/useGetFriendCategoryDetail';
import {theme} from '../../styles';
import EmptyFriendCategoryList from '../../components/Category/EmptyFriendCategoryList';
import PlaceDetail from '../../components/common/PlaceDetail/PlaceDetail';
import {useDeleteFriend} from '../../hooks/mutations/friend/useDeleteFriend';
import queryClient from '../../apis/queryClient';
import {FRIEND_DETAIL_KEYS} from '../../hooks/queries/QueryKeys';

type FriendProps = StackScreenProps<'Friend'>;

export default function Friend({navigation, route}: FriendProps) {
  const {id, name} = route.params;
  const {data: categoryListData} = useGetFriendCategoryList(id);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const {mutate: remove} = useDeleteFriend({
    onSuccess: res => {
      const {errorCode, message, result} = res;

      if (errorCode) {
        console.error(`${errorCode} - ${message}`);
        navigation.pop();
        return;
      }

      console.log('[Remove] ', res.result);
      queryClient.invalidateQueries({
        queryKey: FRIEND_DETAIL_KEYS.all,
      });
      navigation.pop();
    },
    onError: e => {
      console.error('[Remove] ', e);
    },
  });

  useEffect(() => {
    if (categoryListData?.userCategoryDtoList?.length) {
      setSelectedCategory(categoryListData.userCategoryDtoList[0].id);
    }
  }, [categoryListData]);

  const {data, loadMore, isFetching, hasNextPage, totalElement} =
    useGetFriendCategoryDetail({
      targetId: id,
      userCategoryId: selectedCategory ?? 0,
      page: 1,
    });

  // 카테고리 목록 구성
  const categoryList = categoryListData?.userCategoryDtoList?.map(
    (category: any) => ({
      ...category,
      title: category.name,
    }),
  );

  // 카테고리 아이템 렌더링
  const renderCategoryItem = ({item}: {item: UserCategory}) => {
    const IconComponent =
      ICON_FRIEND_MAPS[item.title] || ICON_FRIEND_MAPS['기타'];

    const textStyle =
      item.id === selectedCategory
        ? [styles.categoryText, {color: theme.palette.black}]
        : styles.categoryText;
    const iconOpacity = item.id === selectedCategory ? 1 : 0.6; // 불투명도 설정
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.categoryItem}
        onPress={() => {
          setSelectedCategory(item.id);
        }}>
        <View style={{opacity: iconOpacity}}>
          <IconComponent />
        </View>
        <Text style={textStyle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: {item: UserLocation}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('FriendDetail', {id: item.id, targetId: id})
      }>
      <PlaceDetail
        title={item.location.placeName}
        description={item.location.roadAddress}
        imageSrc={item.photoUrl}
      />
    </TouchableOpacity>
  );

  function handleDelete() {
    remove({targetId: id});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.FriendTopContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IcLeft />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <IcFriendDelete />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          {name} 님이 {'\n'}
          기록한 여행지들이에요!
        </Text>

        <Text style={styles.subTitle}>카테고리</Text>

        <FlatList
          data={categoryList}
          keyExtractor={(item: UserCategory) => item.id.toString()}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        />
      </View>

      {/* 카테고리가 선택되었을 때에만 해당 카테고리의 데이터를 표시 */}
      <Text style={styles.itemCount}>총 {totalElement}개</Text>

      {selectedCategory && (
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
          ListEmptyComponent={EmptyFriendCategoryList}
        />
      )}
    </SafeAreaView>
  );
}
