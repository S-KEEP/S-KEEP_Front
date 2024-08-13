import React from 'react';
import {View, Text} from 'react-native';
import styles from './CategoryCard.style';
import {CardProps} from '../../../types/components/category/category';

export default function Card({
  title,
  description,
  IconComponent,
  backgroundColor,
}: CardProps) {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>
        <IconComponent />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
