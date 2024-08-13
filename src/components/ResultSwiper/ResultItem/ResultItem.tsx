import {Image, ScrollView, Text, View} from 'react-native';
import {IcFolder, IcMarker, IcTarget} from '../../../assets/icon';
import styles from './ResultItem.style';
import {UserLocation} from '../../../types/dtos/location';

interface ResultItemProps {
  item: UserLocation;
}
export default function ResultItem({item}: ResultItemProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: item.photoUrl}} style={styles.image} />

        <View style={styles.box}>
          <View style={styles.boxItem}>
            <IcMarker />
            <Text style={styles.text}>{item.id}</Text>
          </View>

          <View style={styles.boxItem}>
            <IcTarget />
            <Text style={styles.text}>{item.location.kakaoMapId}</Text>
          </View>

          <View style={styles.boxItem}>
            <IcFolder />
            <Text style={styles.text}>{item.userCategory.title}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
