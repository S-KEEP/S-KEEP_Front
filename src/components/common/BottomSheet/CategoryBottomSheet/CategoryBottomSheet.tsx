import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {
  cardEntityToCategoryMapper,
  ICategory,
} from '../../../../types/dtos/location';
import {useGetCategoryListQuery} from '../../../../hooks/queries/category/useGetCategoryList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardEntity} from '../../../../types/dtos/category';
import {Text, View} from 'react-native';
import Button from '../../Button/Button';
import BottomSheet, {BottomSheetModalRef} from '../BottomSheet';
import styles from './CategoryBottomSheet.styles';
import CategoryItem from '../../Category/CategoryItem/CategoryItem';

export interface CategoryBottomSheetProps {
  title: string;
  action: string;
  onModify: (category: ICategory) => void;
}

export interface CategoryBottomSheetRef {
  open: () => void;
  close: () => void;
}

const CategoryBottomSheet = forwardRef<
  CategoryBottomSheetRef,
  CategoryBottomSheetProps
>(({title, action, onModify}, ref) => {
  const bottomSheetRef = useRef<BottomSheetModalRef>(null);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.open(),
    close: () => bottomSheetRef.current?.close(),
  }));

  const cardListData = useGetCategoryListQuery();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleCategorySelect = (index: number) => {
    setSelectedIndex(index);
  };

  const renderItem = ({item, index}: {item: CardEntity; index: number}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedIndex === index && styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategorySelect(index)}>
      <CategoryItem category={cardEntityToCategoryMapper(item)} />
    </TouchableOpacity>
  );

  const handleModify = () => {
    const newCategory = cardEntityToCategoryMapper(cardListData[selectedIndex]);

    console.log('Selected Category:', newCategory);
    onModify(newCategory);
  };

  return (
    <BottomSheet ref={bottomSheetRef}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <BottomSheetFlatList
          data={cardListData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
        />

        <Button text={action} onPress={handleModify} />
      </View>
    </BottomSheet>
  );
});

export default CategoryBottomSheet;
