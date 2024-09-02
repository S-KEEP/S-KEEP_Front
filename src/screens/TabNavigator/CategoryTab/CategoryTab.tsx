import React, {useMemo} from 'react';
import styles from './CategoryTab.style';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Card from '../../../components/common/Category/CategoryCard/CategoryCard';
import {theme} from '../../../styles';
import {IcCardRest, IcPlus} from '../../../assets/icon';
import {useGetCategoryListQuery} from '../../../hooks/queries/category/useGetCategoryList';
import {
  COLOR_MAP,
  ICON_MAPS,
  OFFSET,
} from '../../../constants/components/CategoryCard';
import {CardData} from '../../../types/components/category/category';
import {TabOfStackScreenProps} from '../../../navigators/types';

type CategoryTabProps = TabOfStackScreenProps<'TabNavigator', 'CategoryTab'>;
export default function CategoryTab({navigation}: CategoryTabProps) {
  const cardListData = useGetCategoryListQuery();

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

  const handleCardPress = (item: CardData) => {
    navigation.navigate('CategoryList', {
      title: item.title,
      description: item.description,
    });
  };

  const renderItem = ({item}: {item: CardData}) => (
    <View style={styles.cardWrapper}>
      <Card
        title={item.title}
        description={item.description}
        IconComponent={item.IconComponent}
        backgroundColor={item.backgroundColor}
        onPress={() => handleCardPress(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        나만의 카테고리로 {'\n'}
        여행지를 기록해봐요
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
      <Text style={styles.subTitle}>
        카테고리별로 다양한 여행지를 만나봐요!
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CategoryAdd')}>
        <IcPlus />
        <Text style={styles.addButtonText}>카테고리 추가</Text>
      </TouchableOpacity>
    </View>
  );
}
