import KakaoShareLink from 'react-native-kakao-share-link';
import {Alert} from 'react-native';

export const handleKakaoInvite = async (
  friendToken: string,
  username: string,
) => {
  try {
    const response = await KakaoShareLink.sendFeed({
      content: {
        title: `스킵에서 ${username}님이 함께 하고 싶어해요!`,
        imageUrl:
          'https://postfiles.pstatic.net/MjAyNDA5MjNfMjY1/MDAxNzI3MDk1Mjg3NDYw.5NwEXapS9toeSy67eUFtQWu7PY1LVjyirTy9y705YCsg.kFMQJm80jjYIBi1iOVMQHh2NiyKl9EEIhN-X9aMt7kcg.PNG/img_share_kakao.png?type=w773',
        link: {
          webUrl: 'https://developers.kakao.com/',
          mobileWebUrl: 'https://developers.kakao.com/',
          androidExecutionParams: [{key: 'test', value: String(friendToken)}],
          iosExecutionParams: [{key: 'test', value: String(friendToken)}],
        },
        description: `${username}님의 여행지를 확인해요 ✈️`,
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
