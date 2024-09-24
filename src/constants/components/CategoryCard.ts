import {Dimensions} from 'react-native';
import {
  IcActivity,
  IcCardActivity,
  IcCardFestival,
  IcCardFood,
  IcCardHistory,
  IcCardNature,
  IcCardRest,
  IcCardShopping,
  IcFestival,
  IcFood,
  IcFriendActivity,
  IcFriendEtc,
  IcFriendFestival,
  IcFriendFood,
  IcFriendHistory,
  IcFriendNature,
  IcFriendRest,
  IcFriendShopping,
  IcHistory,
  IcNature,
  IcShopping,
  IcVacation,
} from '../../assets/icon';

// 아이콘
export const ICON_MAPS: Record<string, React.ComponentType<{}>> = {
  액티비티: IcCardActivity,
  '문화/축제': IcCardFestival,
  맛집: IcCardFood,
  '역사/유적지': IcCardHistory,
  '공원/자연': IcCardNature,
  휴식: IcCardRest,
  '쇼핑/도심': IcCardShopping,
};



export const ICON_FRIEND_MAPS: Record<string, React.ComponentType<{}>> = {
  액티비티: IcFriendActivity,
  '문화/축제': IcFriendFestival,
  맛집: IcFriendFood,
  '역사/유적지': IcFriendHistory,
  '공원/자연': IcFriendNature,
  휴식: IcFriendRest,
  '쇼핑/도심': IcFriendShopping,
  기타: IcFriendEtc,
};

export const IC_MAPS: Record<string, React.ComponentType<{}>> = {
  액티비티: IcActivity,
  '문화/축제': IcFestival,
  맛집: IcFood,
  '역사/유적지': IcHistory,
  '공원/자연': IcNature,
  휴식: IcVacation,
  '쇼핑/도심': IcShopping,
};

// 카드색
export const COLOR_MAP: Record<string, string> = {
  휴식: '#C8EEFF',
  '공원/자연': '#CBF6C4',
  '문화/축제': '#FFF4CC',
  '쇼핑/도심': '#E3CCFF',
  '역사/유적지': '#E3E3E3',
  맛집: '#FFCFA2',
  액티비티: '#BEFBF0',
};

// 배경색
export const COLOR_DETAIL_MAP: Record<string, string> = {
  휴식: '#E3F7FF',
  '공원/자연': '#E5FBE1',
  '문화/축제': '#FFFDEB',
  '쇼핑/도심': '#F1E5FF',
  '역사/유적지': '#F2F2F2',
  맛집: '#FFE7D1',
  액티비티: '#DFFDF7',
};

export const CARD_SIZE = Dimensions.get('window').width - 150;
export const MARGIN = 20;
export const OFFSET = CARD_SIZE - MARGIN;
