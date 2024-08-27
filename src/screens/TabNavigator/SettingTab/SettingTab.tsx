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
import localStorage from '../../../libs/async-storage';
import {TokenKeys} from '../../../libs/async-storage/constants/keys';

type SettingTabProps = TabOfStackScreenProps<'TabNavigator', 'SettingTab'>;
export default function SettingTab({navigation}: SettingTabProps) {
  const userInfoData = useGetUserInfoQuery();
  const setAuth = useSetRecoilState(authState);
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    const testok =
      'eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoxNCwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjQ2NTk1MDgsImV4cCI6MTcyNDc0NTkwOH0.FbawZrer3JuvHr5PK1o22zjeroMSnhpv0jhHSx2mi3Cmq9Ekmo-o5cJgMHdEEJqymguuy10ZL6zwmNC0wGSKfA';
    localStorage.set(TokenKeys.AccessToken, testok);
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
      <Profile userInfo={userInfoData.user} />
      <View style={styles.divider} />
      <SettingsList onLogout={handleLogout} />
    </ScrollView>
  );
}
