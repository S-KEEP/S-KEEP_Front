import React from 'react';
import {StyleSheet, View} from 'react-native';
import Skeleton from '../../Skeleton/Skeleton';
export default function SkeletonWeatherCard() {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.image} />
      <Skeleton style={styles.text} />
      <Skeleton style={styles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 80,
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    height: 20,
    marginBottom: 10,
    borderRadius: 4,
  },
});
