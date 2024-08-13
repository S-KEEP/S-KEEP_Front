import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, padding, wrapper, wrapperFull} from '../../styles/common';
import {theme} from '../../styles';
import {IcCancel, IcDown} from '../../assets/icon';
import {StackScreenProps} from '../../navigators/types';
import Map from '../../components/Detail/Map';
import {useGetLocation} from '../../hooks/queries/location/useGetLocation';
import ModifyButton from '../../components/common/Button/ModifyButton';
import CategoryBottomSheet from '../../components/common/BottomSheet/CategoryBottomSheet/CategoryBottomSheet';
import CategoryList from '../../components/common/BottomSheet/CategoryList/CategoryList';

type DetailProps = StackScreenProps<'Detail'>;
export default function Detail({navigation, route}: DetailProps) {
  const {id} = route.params;

  const {data: location, isLoading, isError} = useGetLocation(id);

  // [TODO] 처리
  if (isLoading || isError || !location) {
    return <SafeAreaView style={{...wrapperFull}}></SafeAreaView>;
  }

  return (
    <SafeAreaView style={{...wrapperFull}}>
      <IcCancel onPress={() => navigation.pop()} style={{...padding}} />

      <Map x={location?.location.x} y={location.location.y} />

      <View style={styles.box}>
        <Image style={styles.image} source={{uri: location?.photoUrl}} />

        <View>
          <Text style={styles.title}>인천대공원</Text>

          <View style={styles.addressBox}>
            <Text numberOfLines={1} style={styles.address}>
              가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd가나다라마바사아자차카타dddddd
            </Text>
            <IcDown />
          </View>
        </View>

        <View style={styles.addressBox}></View>
      </View>

      <View style={styles.box}>
        <CategoryList category={location.userCategory} />
        <ModifyButton onPress={() => {}} />
      </View>

      <CategoryBottomSheet />
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
