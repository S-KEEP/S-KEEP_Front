import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import CategorySelector from './CategorySelector';
import {
  cardEntityToCategoryMapper,
  Category,
} from '../../../../types/dtos/location';
import {useGetCategoryListQuery} from '../../../../hooks/queries/category/useGetCategoryList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardEntity} from '../../../../types/dtos/category';
import CategoryList from '../CategoryList/CategoryList';
import {Text, View} from 'react-native';

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
    close: () => bottomSheetModalRef.current?.close(),
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
      <CategoryList category={cardEntityToCategoryMapper(item)} />
    </TouchableOpacity>
  );

  const handleNothingYet = () => {
    // onModify(selectedCategory)
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={['25%', '50%']}
      containerStyle={{backgroundColor: '#000000C4'}}>
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
    </BottomSheetModal>
  );
});

export default CategoryBottomSheet;

import {StyleSheet} from 'react-native';
import {theme} from '../../../../styles';
import Button from '../../Button/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    ...theme.typography.body_sb_17,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCategoryItem: {
    backgroundColor: theme.palette.gray1,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  categoryText: {
    ...theme.typography.body_m_16,
  },
});
