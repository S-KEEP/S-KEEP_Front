import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {theme} from '../../../../styles';
import {View, Text} from 'react-native';
import {
  COLOR_MAP,
  IC_MAPS,
} from '../../../../constants/components/CategoryCard';
import {Category} from '../../../../types/dtos/location';
import {flexBox} from '../../../../styles/common';

interface CategoryListProps {
  category: Category;
}
export default function CategoryList({category}: CategoryListProps) {
  const Icon = useMemo(() => {
    return {
      component: IC_MAPS[category.title],
      backgroundColor: COLOR_MAP[category.title] || theme.palette.white,
    };
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon.component />
      </View>

      <Text style={styles.categoryText}>{category.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...flexBox('row', 'flex-start'),
    padding: 10,
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
