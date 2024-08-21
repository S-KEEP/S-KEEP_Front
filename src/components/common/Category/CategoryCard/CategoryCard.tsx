import {View, Text, TouchableOpacity} from 'react-native'; // TouchableOpacity를 추가로 import
import styles from './CategoryCard.style';
import {CardProps} from '../../../../types/components/category/category';

export default function Card({
  title,
  description,
  IconComponent,
  backgroundColor,
  onPress,
}: CardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor}]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>
        <IconComponent />
      </View>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}
