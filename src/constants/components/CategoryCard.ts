import { Dimensions } from 'react-native';
import {
  IcCardActivity,
  IcCardFestival,
  IcCardFood,
  IcCardHistory,
  IcCardNature,
  IcCardRest,
  IcCardShopping,
} from '../../assets/icon';

export const ICON_MAPS: Record<string, React.ComponentType<{}>> = {
  익사이팅: IcCardActivity,
  '문화/축제': IcCardFestival,
  맛집: IcCardFood,
  '역사/유적지': IcCardHistory,
  '공연/자연': IcCardNature,
  휴식: IcCardRest,
  '쇼핑/도심': IcCardShopping,
};

export const COLOR_MAP: Record<string, string> = {
  휴식: '#C8EEFF',
  '공연/자연': '#CBF6C4',
  '문화/축제': '#FFF4CC',
  '쇼핑/도심': '#E3CCFF',
  '역사/유적지': '#E3E3E3',
  맛집: '#FFCFA2',
  익사이팅: '#BEFBF0',
};

export const CARD_SIZE = Dimensions.get('window').width - 150;
export const MARGIN = 20;
export const OFFSET = CARD_SIZE - MARGIN;