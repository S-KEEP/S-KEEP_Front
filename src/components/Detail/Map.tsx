import React, {useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {theme} from '../../styles';

interface MapProps {
  x?: string;
  y?: string;
}
export default function Map({x, y}: MapProps) {
  const location = useMemo(() => {
    if (!x || !y) return {latitude: 37.78825, longitude: -122.4324};
    return {
      latitude: Number(y),
      longitude: Number(x),
    };
  }, [x, y]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker coordinate={{...location}} pinColor={theme.palette.primary}>
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
