import Swiper from 'react-native-swiper';
import {IcPaginationLeft, IcPaginationRight} from '../../../assets/icon';
import {View} from 'react-native';
import ResultItem from '../ResultItem/ResultItem';

export interface Result {
  title: string;
  address: string;
  category: string;
}
interface ResultSwiperProps {
  items: Result[];
}
export default function ResultSwiper({items}: ResultSwiperProps) {
  return (
    <Swiper
      showsButtons={true}
      showsPagination={false}
      loop={false}
      style={{marginTop: 30}}
      prevButton={<IcPaginationLeft style={{marginTop: -120}} />}
      nextButton={<IcPaginationRight style={{marginTop: -120}} />}>
      {items.map((it, idx) => (
        <View style={{flex: 1}} key={idx}>
          <ResultItem item={it} />
        </View>
      ))}
    </Swiper>
  );
}
