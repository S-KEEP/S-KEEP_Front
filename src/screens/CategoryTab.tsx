import {View} from 'react-native';
import PlaceDetail from '../components/common/PlaceDetail';

export default function Category() {
  return (
    <View>
      <PlaceDetail title="인천대공원" description="가나다라마바사아자차카타" />
      <PlaceDetail title="서울숲" description="아야어여오요우유으이" />
    </View>
  );
}
