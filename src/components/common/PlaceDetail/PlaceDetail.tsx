import {View, Text, Image} from 'react-native';
import styles from './PlaceDetail.style';

interface RegionProps {
  title: string;
  description: string;
  imageSrc: string;
}

export default function PlaceDetail({
  title,
  description,
  imageSrc,
}: RegionProps) {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageSrc}} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.addressBox}>
          <Text style={styles.address}>{description}</Text>
        </View>
      </View>
    </View>
  );
}
