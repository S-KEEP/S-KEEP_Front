import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './LoginScreen.style';
import AppleLogin from '../../components/Login/AppleLogin';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        앨범 속 수많은 스크린샷, {'\n'}
        이제 스킵에서 빠르게 저장해요
      </Text>
      <Text style={styles.subtitle}>벌써 1123개의 명소가 저장되었어요.</Text>
      <Image
        source={require('../../assets/icon/ic_login.gif')}
        style={styles.gifContainer}
      />
      <AppleLogin />
    </View>
  );
}
