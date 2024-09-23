import KakaoShareLink from 'react-native-kakao-share-link';
import {Alert} from 'react-native';

export const handleKakaoInvite = async (friendToken: string) => {
  try {
    const response = await KakaoShareLink.sendFeed({
      content: {
        title: '님의 친구가 되어주세요!',
        imageUrl:
          'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
        link: {
          webUrl: 'https://developers.kakao.com/',
          mobileWebUrl: 'https://developers.kakao.com/',
          androidExecutionParams: [{key: 'test', value: String(friendToken)}],
          iosExecutionParams: [{key: 'test', value: String(friendToken)}],
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
            androidExecutionParams: [{key: 'test', value: String(friendToken)}],
            iosExecutionParams: [{key: 'test', value: String(friendToken)}],
          },
        },
      ],
    });
    console.log(response);
  } catch (e) {
    console.error(e);
    Alert.alert('공유 실패');
  }
};
