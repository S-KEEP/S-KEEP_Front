import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, padding, wrapperFull} from '../../styles/common';
import {IcCancel} from '../../assets/icon';
import {StackScreenProps} from '../../navigators/types';
import Map from '../../components/Detail/Map/Map';
import PlaceDetail from '../../components/Detail/PlaceDetail/PlaceDetail';
import Tourism from '../../components/common/Tourism/Tourism';
import Weather from '../../components/common/Weather/Weather';
import Button from '../../components/common/Button/Button';

type DetailTourProps = StackScreenProps<'DetailTour'>;
export default function DetailTour({navigation, route}: DetailTourProps) {
  const {location} = route.params;

  function handleAddCategory() {}

  return (
    <SafeAreaView style={{...wrapperFull, paddingBottom: 0}}>
      <IcCancel onPress={() => navigation.pop()} style={{...padding}} />

      <Map x={location.mapX} y={location.mapY} />

      <ScrollView>
        <PlaceDetail
          imageSrc={location.imageUrl}
          title={String(location.title)}
          description={String(location.address)}
        />

        <Tourism
          name={location.title}
          location={{x: location.mapX, y: location.mapY}}
        />

        <Weather location={{x: location.mapX, y: location.mapY}} />

        <View style={styles.buttonWrapper}>
          <Button text="카테고리에 추가" onPress={handleAddCategory} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '80%',
    margin: 'auto',
  },
});
