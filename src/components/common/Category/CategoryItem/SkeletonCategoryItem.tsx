import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {flexBox} from '../../../../styles/common';
import Skeleton from '../../Skeleton/Skeleton';

export default function SkeletonCategoryItem() {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.skeletonIcon} />
      <Skeleton style={styles.skeletonText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...flexBox('row', 'flex-start'),
    padding: 10,
  },
  skeletonIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  skeletonText: {
    width: 80,
    height: 25,
  },
});
