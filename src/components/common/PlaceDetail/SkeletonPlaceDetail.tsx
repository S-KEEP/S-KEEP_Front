import {View} from 'react-native';
import styles from './PlaceDetail.style';
import Skeleton from '../Skeleton/Skeleton';

export default function SkeletonPlaceDetail() {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.image} />

      <View style={styles.textContainer}>
        <Skeleton style={styles.skeletonTitle} />
        <Skeleton style={styles.skeletonDescription} />
      </View>
    </View>
  );
}
