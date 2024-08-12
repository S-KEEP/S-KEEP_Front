import React from 'react';
import {View, Text, FlatList, Dimensions, StyleSheet} from 'react-native';
import {CARD_DATA} from '../../constants/components/CategoryCard';
import Card from '../../components/common/CategoryCard/CategoryCard';

interface CardData {
  title: string;
  description: string;
  IconComponent: React.ComponentType<{}>;
}

export default function Category() {
  const renderItem = ({item}: {item: CardData}) => (
    <View style={styles.cardWrapper}>
      <Card
        title={item.title}
        description={item.description}
        IconComponent={item.IconComponent}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        나만의 카테고리로 {'\n'}
        명소를 기록해봐요
      </Text>
      <FlatList
        data={CARD_DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').width - 60} // Adjust based on card width
        contentContainerStyle={styles.cardContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    marginTop: 20,
  },
  cardWrapper: {
    width: Dimensions.get('window').width - 150,
  },
});
