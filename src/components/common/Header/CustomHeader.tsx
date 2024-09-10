import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {IcLeft} from '../../../assets/icon';
import useNavigator from '../../../navigators/hooks/useNavigator';
import {useDeleteCategory} from '../../../hooks/mutations/category/useDeleteCategory';
import Icon from '../Icon/Icon';

/**
 * [커스텀 헤더 보류]
 *  타이틀 전달받고 카테고리 목록 조회다시 호출해서 거기서
 *  타이틀이랑 비교해서 아이디값을 저장하고 delete할 때 그 아이디값을 보낸다
 *  결국 아이디 값을 전역으로 가지고 있어야 필터링이 가능
 */
export default function CustomHeader() {
  const {stackNavigation} = useNavigator();
  const {mutate: deleteCategory} = useDeleteCategory();

  return (
    <View
      style={{
        width: '95%',
        paddingRight: 24,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
      }}>
      <Icon onPress={() => stackNavigation.goBack()} children={<IcLeft />} />

      <TouchableOpacity>
        <Text>삭제</Text>
      </TouchableOpacity>
    </View>
  );
}
