import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {theme} from '../../../../styles';
import {View, Text} from 'react-native';
import {IC_MAPS} from '../../../../constants/components/CategoryCard';
import {Category} from '../../../../types/dtos/location';
import {flexBox} from '../../../../styles/common';

interface CategoryListProps {
  category: Category;
}
export default function CategoryItem({category}: CategoryListProps) {
  const IconComponent = useMemo(() => {
    return IC_MAPS[category.name] || DefaultIcon;
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <IconComponent />
      </View>

      <Text style={styles.categoryText}>{category.name}</Text>
    </View>
  );
}

const DefaultIcon = () => (
  <View style={styles.defaultIcon}>
    <Text>?</Text>
  </View>
);

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
  defaultIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3E3E3',
    borderRadius: 6.72,
  },
  defaultIconText: {
    color: theme.palette.white,
  },
});
