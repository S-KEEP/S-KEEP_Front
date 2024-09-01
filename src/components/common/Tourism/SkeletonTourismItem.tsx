import React from 'react';
import {StyleSheet, View} from 'react-native';
import {flexBox} from '../../../styles/common';
import Skeleton from '../Skeleton/Skeleton';

export default function SkeletonTourismItem() {
  return (
    <View style={styles.item}>
      <Skeleton style={styles.itemImage} />
      <Skeleton style={styles.itemTitle} />
      <Skeleton style={styles.itemDistance} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    ...flexBox('column'),
    gap: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: '#efefef',
    borderRadius: 10,
  },
  itemTitle: {
    width: 80,
    height: 12,
    backgroundColor: '#efefef',
    borderRadius: 4,
  },
  itemDistance: {
    width: 40,
    height: 12,
    backgroundColor: '#efefef',
    borderRadius: 4,
  },
});
