import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {
  IcActivity,
  IcFood,
  IcNature,
  IcVacation,
} from '../../../../assets/icon';
import Button from '../../Button/Button';
import styles from './CategorySelector.style';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const categories: Category[] = [
  {id: '1', name: '익사이팅', icon: <IcActivity />},
  {id: '2', name: '공원 / 자연', icon: <IcNature />},
  {id: '3', name: '휴식', icon: <IcVacation />},
  {id: '4', name: '맛집', icon: <IcFood />},
];

interface CategorySelectorProps {
  // onModify: (category: Category) => void;
}
function CategorySelector({onModify}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
  };
  const handleNothingYet = () => {
    // onModify(selectedCategory)
  };

  const renderItem = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategorySelect(item.id)}>
      <View style={styles.icon}>{item.icon}</View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>변경할 카테고리를 선택해 주세요!</Text>

      <BottomSheetFlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <TouchableOpacity>
        <Button text="변경하기" onPress={handleNothingYet} />
      </TouchableOpacity>
    </View>
  );
}

export default CategorySelector;
