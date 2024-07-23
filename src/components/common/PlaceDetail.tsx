import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IcDown} from '../../assets/icon';
import {theme} from '../../styles';
import {flexBox, padding} from '../../styles/common';

interface RegionProps {
  title: string;
  description: string;
}

const PlaceDetail: React.FC<RegionProps> = ({title, description}) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}></View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.addressBox}>
          <Text numberOfLines={1} style={styles.address}>
            가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd
          </Text>
          <IcDown />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    ...flexBox('row', 'flex-start'),
    gap: 20,
    ...padding,
    top: 50,
  },

  image: {
    width: 80,
    height: 80,

    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  addressBox: {
    ...flexBox('row', 'flex-start', 'center'),
  },

  address: {...theme.typography.body_m_16, marginTop: 10, width: '70%'},
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.body_sb_17,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default PlaceDetail;
