import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {padding} from '../../../styles/common';
import {theme} from '../../../styles';
import {TourLocationDTO} from '../../../types/dtos/tourLocation';
import {useGetTourList} from '../../../hooks/queries/tourism/useGetTourList';
import TourismItem from './TourismItem';
import SkeletonTourismItem from './SkeletonTourismItem';

interface TourismProps {
  name: string;
  location: {x: string; y: string};
}

export default function Tourism({name, location}: TourismProps) {
  const {data, isLoading} = useGetTourList(location);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name} 주변에 이런 곳은 어때요?</Text>

      {isLoading || !data ? (
        <FlatList
          data={Array.from({length: 3})}
          renderItem={() => <SkeletonTourismItem />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.itemContainer}
        />
      ) : data.totalCount > 0 ? (
        <FlatList
          data={data.tourLocationDtolist}
          renderItem={({item}: {item: TourLocationDTO}) => (
            <TourismItem item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.itemContainer}
        />
      ) : (
        <Text style={styles.emptyText}>
          가까운 곳에 둘러볼 만한 곳이 없어요!
        </Text>
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
  itemContainer: {
    marginTop: 20,
    gap: 40,
  },
  emptyText: {
    ...theme.typography.body_m_15,
    paddingTop: 60,
    paddingBottom: 40,
    textAlign: 'center',
  },
});
