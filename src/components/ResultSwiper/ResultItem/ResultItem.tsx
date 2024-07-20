import {Text, View} from 'react-native';
import {flexBox} from '../../../styles/common';
import {IcFolder, IcMarker, IcTarget} from '../../../assets/icon';
import {theme} from '../../../styles';
import styles from './ResultItem.style';
import {Result} from '../ResultSwiper/ResultSwiper';

interface ResultItemProps {
  item: Result;
}
export default function ResultItem({item}: ResultItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.image} />

      <View style={styles.box}>
        <View style={styles.boxItem}>
          <IcMarker />
          <Text style={styles.text}>{item.title}</Text>
        </View>

        <View style={styles.boxItem}>
          <IcTarget />
          <Text style={styles.text}>{item.address}</Text>
        </View>

        <View style={styles.boxItem}>
          <IcFolder />
          <Text style={styles.text}>{item.category}</Text>
        </View>
      </View>
    </View>
  );
}
