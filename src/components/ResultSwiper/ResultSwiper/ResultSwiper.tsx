import Swiper from 'react-native-swiper';
import {IcPaginationLeft, IcPaginationRight} from '../../../assets/icon';
import {TouchableOpacity, View} from 'react-native';
import ResultItem from '../ResultItem/ResultItem';
import {UserLocation} from '../../../types/dtos/location';

interface ResultSwiperProps {
  items: UserLocation[];
}
export default function ResultSwiper({items}: ResultSwiperProps) {
  return (
    <Swiper
      showsButtons={true}
      showsPagination={false}
      loop={false}
      height={500}
      style={{
        marginTop: 30,
        position: 'relative',
      }}
      prevButton={
        <TouchableOpacity style={{marginBottom: 250}}>
          <IcPaginationLeft />
        </TouchableOpacity>
      }
      nextButton={
        <TouchableOpacity style={{marginBottom: 250}}>
          <IcPaginationRight />
        </TouchableOpacity>
      }>
      {items.map((it, idx) => (
        <ResultItem item={it} key={idx} />
      ))}
    </Swiper>
  );
}
