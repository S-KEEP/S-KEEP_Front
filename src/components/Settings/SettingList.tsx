import React from 'react';
import {View} from 'react-native';
import SettingItem from './SettingItem';
import styles from './Setting.style';
import VersionCheck from 'react-native-version-check';
import useNavigator from '../../navigators/hooks/useNavigator';

type SettingsListProps = {
  onLogout: () => void;
};

const version = VersionCheck.getCurrentVersion();
export default function SettingsList({onLogout}: SettingsListProps) {
  const {stackNavigation} = useNavigator();

  return (
    <View style={styles.settingsContainer}>
      <SettingItem text="서비스 이용약관" />
      <SettingItem text="개인정보 처리방침" />
      <SettingItem text="로그아웃" onPress={onLogout} />
      <SettingItem
        text="회원탈퇴"
        onPress={() => stackNavigation.navigate('Withdraw')}
      />
      <SettingItem text="버전 정보" extraInfo={version} />
    </View>
  );
}
