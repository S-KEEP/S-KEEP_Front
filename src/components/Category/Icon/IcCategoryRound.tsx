import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {flexBox} from '../../../styles/common';
import {COLOR_MAP, ICON_MAPS} from '../../../constants/components/CategoryCard';
import {IcCardEtcBlue} from '../../../assets/icon';
import {theme} from '../../../styles';

/**
 * IcRound~~
 * 카테고리 라운드 아이콘
 */
interface IcCategoryRoundProps {
  category: string;
}
export default function IcCategoryRound({category}: IcCategoryRoundProps) {
  const Icon = useMemo(() => {
    return ICON_MAPS[category] || IcCardEtcBlue;
  }, [category]);

  const backgroundColor = useMemo(() => {
    return COLOR_MAP[category] || theme.palette.white;
  }, [category]);

  return (
    <View style={[style.container, {backgroundColor}]}>
      <Icon />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 125,
    height: 125,
    backgroundColor: '#C8EEFF',
    borderRadius: 125,
    ...flexBox(),
  },
});
