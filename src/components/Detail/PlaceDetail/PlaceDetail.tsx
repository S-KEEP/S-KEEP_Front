import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {IcDown} from '../../../assets/icon';
import styles from './PlaceDetail.style';

interface RegionProps {
  title: string;
  description: string;
  imageSrc: string;
}

export default function PlaceDetail({
  title,
  description,
  imageSrc,
}: RegionProps) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, expanded && styles.expanded]}>
      <Image source={{uri: imageSrc}} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.addressBox}>
          <Text numberOfLines={expanded ? undefined : 1} style={styles.address}>
            {description}
          </Text>
          <TouchableOpacity onPress={handleToggle}>
            <IcDown />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
