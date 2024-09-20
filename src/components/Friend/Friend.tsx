import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {flexBox} from '../../styles/common';
import {theme} from '../../styles';
import {IcPlus} from '../../assets/icon';
import KakaoShareLink from 'react-native-kakao-share-link';
import {RouteProp, useRoute} from '@react-navigation/native';
import {TabParamList} from '../../navigators/types';
import { usePostAddCategory } from '../../hooks/mutations/category/usePostCategoryAdd';
import { usePostInvitationToken } from '../../hooks/mutations/friend/usePostInvitationToken';

type Screen2Route = RouteProp<TabParamList, 'SettingTab'>;

export default function Friend() {
  const route = useRoute<Screen2Route>();
  const {test} = route.params;


  useEffect(() => {
    Alert.alert(test);
  }, [test]);


  const handleKakaoInvite = async () => {
    try {
      const response = await KakaoShareLink.sendFeed({
        content: {
          title: '님의 친구가 되어주세요!',
          imageUrl:
            'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
          link: {
            webUrl: 'https://developers.kakao.com/',
            mobileWebUrl: 'https://developers.kakao.com/',
            androidExecutionParams: [{key: 'test', value: 'from Kakao App'}],
            iosExecutionParams: [{key: 'test', value: 'from Kakao App'}],
          },
          description: '초대수락 버튼을 누르면 스킵으로 이동해요!',
        },
        buttons: [
          {
            title: '친구 수락하기',
            link: {
              androidExecutionParams: [{key: 'test', value: 'from Kakao App'}],
              iosExecutionParams: [
                {key: 'test', value: 'from Kakao App'},
                {key: 'test', value: 'from Kakao App'},
              ],
            },
          },
        ],
      });
      console.log(response);
      Alert.alert('공유 성공', '카카오톡으로 성공적으로 공유되었습니다.');
      console.log('✅', route);
    } catch (e) {
      console.error(e);
      Alert.alert('공유 실패');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>친구</Text>
      <Text style={styles.description}>
        친구를 추가해 여행지를 공유해 보세요!
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={handleKakaoInvite}>
        <IcPlus />
        <Text style={styles.addButtonText}>카카오톡으로 친구 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  addButton: {
    ...flexBox('row', 'center', 'center'),
    backgroundColor: theme.palette.primary,
    paddingVertical: 12,
    gap: 5,
    width: 230,
    borderRadius: 30,
  },
  addButtonText: {
    color: theme.palette.white,
    ...theme.typography.button_sb_15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  kakaoButton: {
    backgroundColor: '#3AB0FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  kakaoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
