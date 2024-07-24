import {View} from 'react-native';
import PlaceDetail from '../components/common/PlaceDetail';

export default function Category() {
  return (
    <View>
      <PlaceDetail
        title="인천대공원"
        description="인천 남동구마바사아자차카타"
        imageSrc="https://velog.velcdn.com/images/kim-jaemin420/post/088bbdd3-3c5c-4520-b250-4e67da4e368b/%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A2%E1%86%A8%E1%84%90%E1%85%B3.png"
      />
      <PlaceDetail
        title="서울숲"
        description="서울특별시 성동구 뚝섬로 399 2층"
        imageSrc="https://velog.velcdn.com/images/kim-jaemin420/post/088bbdd3-3c5c-4520-b250-4e67da4e368b/%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A2%E1%86%A8%E1%84%90%E1%85%B3.png"
      />
    </View>
  );
}
