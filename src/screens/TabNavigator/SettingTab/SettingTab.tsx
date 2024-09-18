import React, {useEffect} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSetRecoilState} from 'recoil';
import {authState} from '../../../libs/recoil/states/auth';
import {useGetUserInfoQuery} from '../../../hooks/queries/settings/useGetUserInfo';
import styles from './SettingTab.style';
import Profile from '../../../components/Settings/Profile';
import SettingsList from '../../../components/Settings/SettingList';
import {TabOfStackScreenProps} from '../../../navigators/types';
import {userInfoState} from '../../../libs/recoil/states/userInfo';
import Icon from '../../../components/common/Icon/Icon';
import {IcBell} from '../../../assets/icon';

type SettingTabProps = TabOfStackScreenProps<'TabNavigator', 'SettingTab'>;
export default function SettingTab({navigation}: SettingTabProps) {
  const userInfoData = useGetUserInfoQuery();
  const setAuth = useSetRecoilState(authState);
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    if (userInfoData) {
      setUserInfo({username: userInfoData.user.name});
    }
  }, [userInfoData, setUserInfo]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
      setAuth({isAuthenticated: false});
      Alert.alert('로그아웃', '성공적으로 로그아웃되었습니다.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('로그아웃 실패', '로그아웃 중 문제가 발생했습니다.');
    }
  };

  if (!userInfoData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          style={{alignSelf: 'flex-end'}}
          onPress={() => navigation.push('Notification')}
          children={<IcBell />}
        />
      </View>

      <Profile userInfo={userInfoData.user} />
      <View style={styles.divider} />
      <SettingsList onLogout={handleLogout} />
    </ScrollView>
  );
}
