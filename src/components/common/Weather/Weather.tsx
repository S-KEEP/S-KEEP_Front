import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {flexBox, padding} from '../../../styles/common';
import {theme} from '../../../styles';
import {IcAirplane, IcWarn} from '../../../assets/icon';
import {FlatList} from 'react-native-gesture-handler';
import {WeatherDTO} from '../../../types/dtos/weather';
import WeatherCard from './WeatherCard/WeatherCard';

export default function Weather() {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>떠나기 좋은 날</Text>
          <IcAirplane />
        </View>

        <FlatList
          data={dummyWeatherList}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.itemContainer}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>피해야 하는 날</Text>
          <IcWarn />
        </View>

        <FlatList
          data={dummyWeatherList}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.itemContainer}
        />
      </View>
    </View>
  );
}

const dummyWeatherList: WeatherDTO[] = [
  {
    date: '2024-08-29',
    eWeatherCondition: 'PARTLY_CLOUDY',
    temperature: '34.0',
  },
  {
    date: '2024-08-30',
    eWeatherCondition: 'PARTLY_CLOUDY',
    temperature: '35.0',
  },
  {
    date: '2024-08-31',
    eWeatherCondition: 'CLEAR',
    temperature: '34.0',
  },
  {
    date: '2024-09-01',
    eWeatherCondition: 'CLEAR',
    temperature: '29.599999999999998',
  },
  {
    date: '2024-09-02',
    eWeatherCondition: 'PARTLY_CLOUDY',
    temperature: '28.2',
  },
  {
    date: '2024-09-03',
    eWeatherCondition: 'PARTLY_CLOUDY',
    temperature: '27.9',
  },
  {
    date: '2024-09-04',
    eWeatherCondition: 'CLEAR',
    temperature: '28.599999999999998',
  },
  {
    date: '2024-09-05',
    eWeatherCondition: 'CLEAR',
    temperature: '29.299999999999997',
  },
  {
    date: '2024-09-06',
    eWeatherCondition: 'PARTLY_CLOUDY',
    temperature: '29.599999999999998',
  },
  {
    date: '2024-09-07',
    eWeatherCondition: 'PARTLY_CLOUDY',
    temperature: '28.9',
  },
  {
    date: '2024-09-08',
    eWeatherCondition: 'PARTLY_CLOUDY',
    temperature: '28.599999999999998',
  },
];
const renderItem = ({item}: {item: WeatherDTO}) => (
  <WeatherCard weather={item} />
);

const styles = StyleSheet.create({
  container: {
    ...padding,
    paddingVertical: 30,

    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  title: {
    ...theme.typography.body_sb_17,
  },
  titleWrapper: {
    ...flexBox('row', 'flex-start'),
    gap: 5,
  },
  itemContainer: {marginTop: 17, gap: 20},
});
