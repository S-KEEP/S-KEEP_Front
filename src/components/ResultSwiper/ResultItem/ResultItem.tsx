import {Image, ScrollView, Text, View} from 'react-native';
import {IcFolder, IcMarker, IcTarget} from '../../../assets/icon';
import styles from './ResultItem.style';
import {UserLocation} from '../../../types/dtos/location';
import ModifyButton from '../../common/Button/ModifyButton';

interface ResultItemProps {
  item: UserLocation;
  onModify: (id: number) => void;
}
export default function ResultItem({item, onModify}: ResultItemProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: item.photoUrl}} style={styles.image} />

        <View style={styles.box}>
          <View style={styles.boxItem}>
            <IcMarker />
            <Text style={styles.text}>{item.location.placeName}</Text>
          </View>

          <View style={styles.boxItem}>
            <IcTarget />
            <Text style={styles.text}>{item.location.roadAddress}</Text>
          </View>

          <View style={styles.boxItemWSpace}>
            <View style={styles.boxItem}>
              <IcFolder />
              <Text style={styles.text}>{item.userCategory.name}</Text>
            </View>

            <ModifyButton onPress={() => onModify(item.id)} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
