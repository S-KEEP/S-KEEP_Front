import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../../styles';
import {TourLocationDTO} from '../../../types/dtos/tourLocation';
import useNavigator from '../../../navigators/hooks/useNavigator';
import {flexBox} from '../../../styles/common';

interface TourismItemProps {
  item: TourLocationDTO;
}

export default function TourismItem({item}: TourismItemProps) {
  const {stackNavigation} = useNavigator();

  function handleOnPress() {
    stackNavigation.navigate('DetailTour', {location: item});
  }

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.item}>
        <Image style={styles.itemImage} source={{uri: item.imageUrl}} />
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.itemDistance}>
          {Number(item.dist).toFixed(0)}km
        </Text>
      </View>
    </TouchableOpacity>
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
    ...theme.typography.text_m_11,
    maxWidth: 90,
  },
  itemDistance: {
    ...theme.typography.text_m_11,
    color: theme.palette.gray6,
  },
});
