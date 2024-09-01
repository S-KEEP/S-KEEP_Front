import {FlatList, StyleSheet, Text, View} from 'react-native';
import {WeatherDTO} from '../../../../types/dtos/weather';
import WeatherCard from '../WeatherCard/WeatherCard';
import {flexBox, padding} from '../../../../styles/common';
import {theme} from '../../../../styles';
import SkeletonWeatherCard from '../WeatherCard/SkeletonWeatherCard';

interface WeatherSectionProps {
  title: string;
  icon: React.ReactNode;
  days: WeatherDTO[];
  emptyMessage: string;
  isLoading: boolean;
}
export default function WeatherSection({
  title,
  icon,
  days,
  emptyMessage,
  isLoading,
}: WeatherSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        {icon}
      </View>

      {isLoading ? (
        <FlatList
          data={Array.from({length: 3})}
          renderItem={() => <SkeletonWeatherCard />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.itemContainer}
        />
      ) : days.length === 0 ? (
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      ) : (
        <FlatList
          data={days}
          renderItem={({item}) => <WeatherCard weather={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.itemContainer}
        />
      )}
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
  itemContainer: {
    marginTop: 17,
    gap: 20,
  },
  emptyText: {
    ...theme.typography.body_m_15,
    paddingVertical: 60,
    textAlign: 'center',
  },
});
