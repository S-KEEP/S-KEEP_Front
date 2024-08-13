import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {useGetUserInfoQuery} from '../../hooks/queries/moreSettings/useGetUserInfo';
import styles from './MoreSettingScreen.style';
import {StackScreenProps} from '../../navigators/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSetRecoilState} from 'recoil';
import {authState} from '../../libs/recoil/states/auth';
import Profile from '../../components/MoreSetting/Profile';
import SettingsList from '../../components/MoreSetting/SettingList';

export default function MoreSettingScreen({navigation}: StackScreenProps) {
  const userInfoData = useGetUserInfoQuery();
  const setAuth = useSetRecoilState(authState);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('LoginScreen');
      setAuth({isAuthenticated: false});
      Alert.alert('로그아웃', '성공적으로 로그아웃되었습니다.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('로그아웃 실패', '로그아웃 중 문제가 발생했습니다.');
    }
  };

  if (!userInfoData) {
    return (
      <View style={styles.loadingContainer}>
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