import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, padding, wrapper, wrapperFull} from '../../styles/common';
import {theme} from '../../styles';
import {IcCancel, IcDown} from '../../assets/icon';
import {StackScreenProps} from '../../navigators/types';
import Map from '../../components/Detail/Map';

export default function Detail({navigation}: StackScreenProps) {
  return (
    <SafeAreaView style={{...wrapperFull}}>
      <IcCancel onPress={() => navigation.pop()} style={{...padding}} />

      <Map />

      <View style={styles.box}>
        <View style={styles.image} />

        <View>
          <Text style={styles.title}>인천대공원</Text>

          <View style={styles.addressBox}>
            <Text numberOfLines={1} style={styles.address}>
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
  box: {
    marginTop: 50,
    ...flexBox('row', 'flex-start'),
    gap: 20,
    ...padding,
  },
  image: {
    width: 100,
    height: 100,

    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  title: {
    ...theme.typography.body_sb_17,
  },
  addressBox: {
    ...flexBox('row', 'flex-start', 'center'),
  },
  address: {...theme.typography.body_m_16, marginTop: 10, width: '70%'},
});
