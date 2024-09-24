import React, {useEffect} from 'react';
import {View, Text, Alert, TouchableOpacity, FlatList} from 'react-native';
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
import {IcBell, IcProfileFriend, IcProfilePlus} from '../../../assets/icon';
import {usePatchFriendAdd} from '../../../hooks/mutations/friend/useFriendAdd';
import {usePostInvitationToken} from '../../../hooks/mutations/friend/usePostInvitationToken';
import {handleKakaoInvite} from '../../../utils/kakaoInviteHandler';
import {UserFriend} from '../../../types/dtos/category';
import {useGetFriendList} from '../../../hooks/queries/friends/useGetFriendList';
import queryClient from '../../../apis/queryClient';
import {FRIEND_DETAIL_KEYS} from '../../../hooks/queries/QueryKeys';

type SettingTabProps = TabOfStackScreenProps<'TabNavigator', 'SettingTab'>;

export default function SettingTab({navigation, route}: SettingTabProps) {
  const userFriend = useGetFriendList(0);
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
      Alert.alert('친구 추가 성공');
      navigation.setParams({test: 'default value'});

      queryClient.invalidateQueries({
        queryKey: FRIEND_DETAIL_KEYS.all,
      });
    },
    onError(e) {
      console.error('❌ 친구 추가 실패: ', e);
      Alert.alert('⚠️ 친구 추가 실패:', e.message);
      navigation.setParams({test: 'default value'});
    },
  });

  useEffect(() => {
    if (route?.params?.test !== 'default value') {
      addFriendWithToken({token: route.params.test});
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

  const renderFriendItem = ({item}: {item: UserFriend}) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => navigation.navigate('Friend', {id: item.id, name: item.name})}>
      <IcProfileFriend />
      <Text style={styles.friendName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (!userInfoData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          style={{alignSelf: 'flex-end'}}
          onPress={() => navigation.push('Notification')}
          children={<IcBell />}
        />
      </View>

      <Profile userInfo={userInfoData.user} />
      <View style={styles.divider} />
      <View style={styles.friendContainer}>
        <Text style={styles.title}>친구</Text>
        <Text style={styles.description}>
          친구를 추가해 여행지를 공유해 보세요!
        </Text>

        {userFriend.data?.friendList.length === 0 ? (
          <View style={styles.centeredButton}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => getFriendToken()}>
              <Text style={styles.addButtonText}>카카오톡으로 친구 추가</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              horizontal
              data={userFriend.data?.friendList}
              keyExtractor={item => item.id.toString()}
              renderItem={renderFriendItem}
              ListHeaderComponent={
                <TouchableOpacity
                  style={styles.friendItem}
                  onPress={() => getFriendToken()}>
                  <IcProfilePlus />
                </TouchableOpacity>
              }
            />
          </>
        )}
      </View>
      <SettingsList onLogout={handleLogout} />
    </View>
  );
}
