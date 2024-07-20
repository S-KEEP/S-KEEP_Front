import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, padding, wrapper, wrapperFull} from '../styles/common';
import {theme} from '../styles';
import MapView, {Marker} from 'react-native-maps';
import {IcCancel, IcDown, IcFolder} from '../assets/icon';
import {StackScreenProps} from '../navigators/types';

export default function Detail({navigation}: StackScreenProps) {
  return (
    <SafeAreaView style={{...wrapperFull}}>
      <IcCancel onPress={() => navigation.pop()} style={{...padding}} />

      <MapScreen />

      <View
        style={{
          marginTop: 50,
          ...flexBox('row', 'flex-start'),
          gap: 20,
          ...padding,
        }}>
        <View
          style={{
            width: 100,
            height: 100,

            backgroundColor: '#D9D9D9',
            borderRadius: 10,
          }}
        />

        <View>
          <Text style={{...theme.typography.body_sb_17}}>인천대공원</Text>

          <View style={{...flexBox('row', 'flex-start', 'center')}}>
            <Text
              numberOfLines={1}
              style={{
                ...theme.typography.body_m_16,
                marginTop: 10,
                width: '70%',
              }}>
              가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd
            </Text>
            <IcDown />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.palette.gray3,
    borderRadius: 10,
    marginTop: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          pinColor={theme.palette.primary}>
          <Image
            source={require('./../assets/icon/ic_pin.png')}
            style={{height: 35, width: 35, resizeMode: 'contain'}}
          />
        </Marker>
      </MapView>
    </View>
  );
}
