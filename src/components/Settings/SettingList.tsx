import React from 'react';
import {View} from 'react-native';
import SettingItem from './SettingItem';
import styles from './Setting.style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigators/types';
type SettingsListProps = {
  onLogout: () => void;
};

export default function SettingsList({onLogout}: SettingsListProps) {
  const navigation = useNavigation<NavigationProp<StackParamList>>(); // Hook to use navigation

  return (
    <View style={styles.settingsContainer}>
      <SettingItem text="서비스 이용약관" />
      <SettingItem text="개인정보 처리방침" />
      <SettingItem text="로그아웃" onPress={onLogout} />
      <SettingItem
        text="회원탈퇴"
        onPress={() => navigation.navigate('Withdraw')}
      />
      <SettingItem text="버전 정보" extraInfo="1.0.0" />
    </View>
  );
}
