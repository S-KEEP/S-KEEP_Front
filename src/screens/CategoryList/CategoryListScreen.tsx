import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '../../navigators/types';

type CategoryListScreenRouteProp = RouteProp<
  StackParamList,
  'CategoryListScreen'
>;

export default function CategoryListScreen() {
  const route = useRoute<CategoryListScreenRouteProp>();
  const {title, description} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {/* Other UI components for displaying the list */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
});
