import React, {useEffect, useMemo} from 'react';
import styles from './CategoryTab.style';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Card from '../../../components/common/Category/CategoryCard/CategoryCard';
import {theme} from '../../../styles';
import {IcCardEtc, IcPlus} from '../../../assets/icon';
import {useGetCategoryListQuery} from '../../../hooks/queries/category/useGetCategoryList';
import {
  COLOR_MAP,
  ICON_MAPS,
  OFFSET,
} from '../../../constants/components/CategoryCard';
import {CardData} from '../../../types/components/category/category';
import {TabOfStackScreenProps} from '../../../navigators/types';

import {usePatchFCMToken} from '../../../hooks/mutations/user/usePatchFCMToken';
import {checkPermission} from '../../../utils/pushUtils';

type CategoryTabProps = TabOfStackScreenProps<'TabNavigator', 'CategoryTab'>;
export default function CategoryTab({navigation}: CategoryTabProps) {
  const {mutate: registerToken} = usePatchFCMToken({
    onSuccess(res) {
      console.log(res);
    },
    onError(e) {
      console.error(e);
    },
  });

  useEffect(() => {
    checkFCMToken();
  }, []);

  async function checkFCMToken() {
    checkPermission()
      .then(token => {
        console.log('Token is', token);
        registerToken(token);
      })
      .catch(e => {
        console.error(e);
      });
  }

  const cardListData = useGetCategoryListQuery();

  const mappedData = cardListData.map(item => ({
    title: item.name,
    description: item.description,
    id: item.id,
    IconComponent: ICON_MAPS[item.name] || IcCardEtc,
    backgroundColor: COLOR_MAP[item.name] || theme.palette.primary,
  }));

  const snapToOffsets = useMemo(
    () =>
      Array.from(Array(mappedData.length)).map((_, index) => index * OFFSET),
    [mappedData],
  );

  const handleCardPress = (item: CardData) => {
    navigation.navigate('CategoryList', {
      id: item.id,
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
