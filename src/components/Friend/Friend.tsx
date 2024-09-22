import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {IcPlus} from '../../assets/icon';
import KakaoShareLink from 'react-native-kakao-share-link';
import {RouteProp, useRoute} from '@react-navigation/native';
import {TabParamList} from '../../navigators/types';
import {usePostInvitationToken} from '../../hooks/mutations/friend/usePostInvitationToken';
import {styles} from './Friend.style';

type Screen2Route = RouteProp<TabParamList, 'SettingTab'>;

export default function Friend() {
  const route = useRoute<Screen2Route>();
  const {test} = route.params;
  console.log('✅이거는 route : ', route);

  const {mutate: getFriendToken} = usePostInvitationToken({
    onSuccess(res) {
      const friendToken = res.result;
      console.log('kakao token : ', friendToken);
      if (friendToken) {
        handleKakaoInvite(friendToken);
      }
    },
    onError(e) {
      console.error(e);
    },
  });

  useEffect(() => {
    Alert.alert(test);
  }, [test]);

  const handleKakaoInvite = async (friendToken: string) => {
    try {
      const response = await KakaoShareLink.sendFeed({
        content: {
          title: '님의 친구가 되어주세요!',
          imageUrl:
            'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
          link: {
            webUrl: 'https://developers.kakao.com/',
            mobileWebUrl: 'https://developers.kakao.com/',
            androidExecutionParams: [
              {key: 'friendToken', value: `${friendToken}`},
            ], // Pass the friendToken
            iosExecutionParams: [{key: 'friendToken', value: `${friendToken}`}],
          },
          description: '초대수락 버튼을 누르면 스킵으로 이동해요!',
        },
        buttons: [
          {
            title: '친구 수락하기',
            link: {
              webUrl:
                'https://apps.apple.com/kr/app/%EC%8A%A4%ED%82%B5-%EC%97%AC%ED%96%89-%EB%AA%85%EC%86%8C-%EB%B6%84%EC%84%9D/id6547865892', // iOS fallback URL
              mobileWebUrl:
                'https://apps.apple.com/kr/app/%EC%8A%A4%ED%82%B5-%EC%97%AC%ED%96%89-%EB%AA%85%EC%86%8C-%EB%B6%84%EC%84%9D/id6547865892', // iOS fallback URL
              androidExecutionParams: [
                {key: 'friendToken', value: `${friendToken}`},
              ],
              iosExecutionParams: [
                {key: 'friendToken', value: `${friendToken}`},
              ],
            },
          },
        ],
      });
      console.log(response);
      Alert.alert('공유 성공', '카카오톡으로 성공적으로 공유되었습니다.');
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
      <View style={styles.centeredButton}>
         <TouchableOpacity
        style={styles.addButton}
        onPress={() => getFriendToken()}>
        <IcPlus />
        <Text style={styles.addButtonText}>카카오톡으로 친구 추가</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  );
}
