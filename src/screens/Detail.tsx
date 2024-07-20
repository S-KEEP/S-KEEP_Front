import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, wrapper} from '../styles/styleUtils';
import {theme} from '../styles';

export default function Detail() {
  return (
    <SafeAreaView style={{...wrapper}}>
      <Text> X </Text>

      <MapScreen />

      <View style={{marginTop: 50, ...flexBox('row', 'flex-start'), gap: 20}}>
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
          <Text style={{...theme.typography.body_m_16, marginTop: 10}}>
            가나다라마바사아자차카타
          </Text>
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
      {/* <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}} />
      </MapView> */}
    </View>
  );
}
