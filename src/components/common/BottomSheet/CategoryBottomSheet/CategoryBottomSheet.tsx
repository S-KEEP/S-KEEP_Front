import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {
  cardEntityToCategoryMapper,
  Category,
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
  onModify: (category: Category) => void;
}

export interface CategoryBottomSheetRef {
  open: () => void;
  close: () => void;
}

const CategoryBottomSheet = forwardRef<
  CategoryBottomSheetRef,
  CategoryBottomSheetProps
>(({onModify}, ref) => {
  const bottomSheetRef = useRef<BottomSheetModalRef>(null);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.open(),
    close: () => bottomSheetRef.current?.close(),
  }));

  const cardListData = useGetCategoryListQuery();
  const [selected, setSelected] = useState(0);

  const handleCategorySelect = (id: number) => {
    setSelected(id);
  };

  const renderItem = ({item}: {item: CardEntity}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selected === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategorySelect(item.id)}>
      <CategoryItem category={cardEntityToCategoryMapper(item)} />
    </TouchableOpacity>
  );

  const handleNothingYet = () => {
    // onModify(selectedCategory)
  };

  return (
    <BottomSheet ref={bottomSheetRef}>
      <View style={styles.container}>
        <Text style={styles.title}>변경할 카테고리를 선택해 주세요!</Text>

        <BottomSheetFlatList
          data={cardListData}
          renderItem={renderItem}
          style={styles.list}
        />

        <TouchableOpacity>
          <Button text="변경하기" onPress={handleNothingYet} />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
});

export default CategoryBottomSheet;
