import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './Login.style';
import AppleLogin from '../../components/Login/AppleLogin';
import {usePostTestLogin} from '../../hooks/mutations/test/usePostTestLogin';
import useAuthStorage from '../../hooks/auth/useAuthStorage';
import {useSetRecoilState} from 'recoil';
import {userInfoState} from '../../libs/recoil/states/userInfo';
import {authState} from '../../libs/recoil/states/auth';
import {userAppleInfoState} from '../../libs/recoil/states/userAppleInfo';

export default function Login() {
  const {setAuthData} = useAuthStorage();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setAuth = useSetRecoilState(authState);
  const setUserAppleInfo = useSetRecoilState(userAppleInfoState);

  const {mutate: postTestLogin} = usePostTestLogin({
    onSuccess(res) {
      console.log(res.result.accessToken);
      const accessToken = res.result.accessToken;
      const refreshToken = res.result.refreshToken;
      const user = 'test user';
      const username = 'test';
      const email = 'test@gmail.com';
      const fullName = {
        givenName: 'test',
        familyName: 'user',
      };
      const idToken = 'null';
      const code = 'null';
      setAuthData({accessToken, refreshToken});
      setUserInfo({username});
      setAuth({isAuthenticated: true});

      setUserAppleInfo({
        email: email || '',
        user: user || '',
        fullName: {
          firstName: fullName?.givenName || '',
          lastName: fullName?.familyName || '',
        },
        identityToken: idToken,
        authorizationCode: code || '',
      });
      console.log(idToken);
    },
    onError(e) {
      console.error(e);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        앨범 속 수많은 스크린샷, {'\n'}
        이제 스킵에서 빠르게 저장해요
      </Text>
      {/* 임시테스트로그인  */}
      <TouchableOpacity onPress={() => postTestLogin()}>
        <Text style={styles.subtitle}>
          벌써 1123개의 여행지가 저장되었어요.
        </Text>
      </TouchableOpacity>
      <Image
        source={require('../../assets/icon/ic_login.gif')}
        style={styles.gifContainer}
      />
      <AppleLogin />
    </View>
  );
}
