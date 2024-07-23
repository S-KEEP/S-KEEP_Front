import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {theme} from '../../styles';

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
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
            source={require('../../assets/icon/ic_pin.png')}
            style={{height: 35, width: 35, resizeMode: 'contain'}}
          />
        </Marker>
      </MapView>
    </View>
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
