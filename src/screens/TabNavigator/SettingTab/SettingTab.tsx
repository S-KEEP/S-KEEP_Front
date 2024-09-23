import React, {useEffect} from 'react';
import {View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSetRecoilState} from 'recoil';
import {authState} from '../../../libs/recoil/states/auth';
import {useGetUserInfoQuery} from '../../../hooks/queries/settings/useGetUserInfo';
import styles from './SettingTab.style';
import Profile from '../../../components/Settings/Profile';
import SettingsList from '../../../components/Settings/SettingList';
import {TabOfStackScreenProps} from '../../../navigators/types';
import {userInfoState} from '../../../libs/recoil/states/userInfo';
import {IcPlus} from '../../../assets/icon';
import {usePatchFriendAdd} from '../../../hooks/mutations/friend/useFriendAdd';
import {usePostInvitationToken} from '../../../hooks/mutations/friend/usePostInvitationToken';
import {handleKakaoInvite} from '../../../utils/kakaoInviteHandler';

type SettingTabProps = TabOfStackScreenProps<'TabNavigator', 'SettingTab'>;

export default function SettingTab({navigation, route}: SettingTabProps) {
  const userInfoData = useGetUserInfoQuery();
  const setAuth = useSetRecoilState(authState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const {mutate: getFriendToken} = usePostInvitationToken({
    onSuccess(res) {
      const friendToken = res.result.friendToken;
      const username = userInfoData?.user.name || '사용자';

      if (friendToken) {
        handleKakaoInvite(friendToken, username);
      }
    },
    onError(e) {
      console.error(e);
    },
  });

  const {mutate: addFriendWithToken} = usePatchFriendAdd({
    onSuccess(res) {
      console.log('✅ 친구 추가 성공: ', res);
      Alert.alert('친구 추가 성공');
      navigation.setParams({test: 'default value'});
    },
    onError(e) {
      console.error('❌ 친구 추가 실패: ', e);
      Alert.alert('⚠️ 친구 추가 실패:', e.message);
      navigation.setParams({test: 'default value'});
    },
  });

  useEffect(() => {
    if (route?.params?.test !== 'default value') {
      console.log('==========딥링크를 통해 들어온 화면입니다==========');
      addFriendWithToken({token: route.params.test});
    } else {
      console.log('==========일반적인 더보기 화면입니다==========');
    }
  }, [route.params]);

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
      <Profile userInfo={userInfoData.user} />
      <View style={styles.divider} />
      <View style={styles.friendContainer}>
        <Text style={styles.title}>친구</Text>
        <Text style={styles.description}>
          친구를 추가해 여행지를 공유해 보세요!
        </Text>
        <View style={styles.centeredButton}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => getFriendToken()}>
            <IcPlus />
            <Text style={styles.addButtonText}>카카오톡으로 친구 추가</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SettingsList onLogout={handleLogout} />
    </ScrollView>
  );
}
