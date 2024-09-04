import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {flexBox, padding} from '../../../../styles/common';
import {theme} from '../../../../styles';
import {IcClear} from '../../../../assets/icon';
import {WEATHER_ICON_MAPS, WeatherDTO} from '../../../../types/dtos/weather';

interface WeatherCardProps {
  weather: WeatherDTO;
}

export default function WeatherCard({weather}: WeatherCardProps) {
  const WeatherIconComponent =
    WEATHER_ICON_MAPS[weather.eWeatherCondition] || IcClear;

  return (
    <View style={styles.item}>
      <Text style={styles.itemDate}>{weather.date}</Text>

      <WeatherIconComponent />

      <Text style={styles.itemTemperature}>
        {Number(weather.temperature).toFixed(0)}°
      </Text>
    </View>
  );
}

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
  item: {
    width: 90,
    ...flexBox('column'),
    gap: 5,
    backgroundColor: theme.palette.gray2,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  itemDate: {
    ...theme.typography.text_m_11,
    color: theme.palette.gray6,
  },
  itemTemperature: {
    ...theme.typography.title_m_16,
  },
});
