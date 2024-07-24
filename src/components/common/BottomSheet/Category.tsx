import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {IcActivity, IcFood, IcNature, IcVacation} from '../../../assets/icon';
import {theme} from '../../../styles';
import {flexBox} from '../../../styles/common';
import Button from '../Button/Button';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {id: '1', name: '익사이팅', icon: <IcActivity />},
  {id: '2', name: '공원 / 자연', icon: <IcNature />},
  {id: '3', name: '휴식', icon: <IcVacation />},
  {id: '4', name: '맛집', icon: <IcFood />},
];

const CategorySelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleGoDetail = () => {};

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
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

  function alert(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>변경할 카테고리를 선택해 주세요!</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity onPress={() => alert('카테고리 변경')}>
        <Button text="변경하기" onPress={handleGoDetail} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  title: {
    ...theme.typography.body_sb_17,
    marginBottom: 20,
  },
  list: {
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCategoryItem: {
    backgroundColor: '#e0e0e0',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  categoryText: {
    fontSize: 16,
  },
});

export default CategorySelector;
