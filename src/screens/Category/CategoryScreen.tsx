import React, {useMemo} from 'react';
import styles from './CategoryScreen.style';
import {View, Text, FlatList, Dimensions, StyleSheet} from 'react-native';
import Card from '../../components/common/CategoryCard/CategoryCard';
import {theme} from '../../styles';
import {IcCardRest} from '../../assets/icon';
import {useGetCategoryListQuery} from '../../hooks/queries/category/useGetCategoryList';
import {
  COLOR_MAP,
  ICON_MAPS,
  OFFSET,
} from '../../constants/components/CategoryCard';
import {CardData} from '../../types/components/category/category';

export default function Category() {
  const cardListData = useGetCategoryListQuery();
  console.log('cardListData:', cardListData);

  const mappedData = cardListData.map(item => ({
    title: item.name,
    description: item.description,
    IconComponent: ICON_MAPS[item.name] || IcCardRest,
    backgroundColor: COLOR_MAP[item.name] || theme.palette.white,
  }));

  const snapToOffsets = useMemo(
    () =>
      Array.from(Array(mappedData.length)).map((_, index) => index * OFFSET),
    [mappedData],
  );

  const renderItem = ({item}: {item: CardData}) => (
    <View style={styles.cardWrapper}>
      <Card
        title={item.title}
        description={item.description}
        IconComponent={item.IconComponent}
        backgroundColor={item.backgroundColor}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        나만의 카테고리로 {'\n'}
        명소를 기록해봐요
      </Text>
      <FlatList
        data={mappedData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToOffsets={snapToOffsets}
        contentContainerStyle={styles.cardContainer}
      />
    </View>
  );
}
