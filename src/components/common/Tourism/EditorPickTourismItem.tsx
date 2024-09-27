import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../../styles';
import {EditorTourLocationDto} from '../../../types/dtos/tourLocation';
import useNavigator from '../../../navigators/hooks/useNavigator';
import {flexBox} from '../../../styles/common';

interface TourismItemProps {
  item: EditorTourLocationDto;
}

export default function EditorTourismItem({item}: TourismItemProps) {
  const {stackNavigation} = useNavigator();

  function handleOnPress() {
    // stackNavigation.navigate('DetailTour', {location: item.address});
  }

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.item}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image style={styles.itemImage} source={{uri: item.imageUrl}} />
          {/* Category Label */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
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
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: 100,
    height: 100,
    backgroundColor: '#efefef',
    borderRadius: 10,
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    ...theme.typography.text_m_11,
    color: theme.palette.black,
  },
  itemTitle: {
    ...theme.typography.text_m_11,
    maxWidth: 120,
    textAlign: 'center',
  },
});
