import React from 'react';
import {View, Text} from 'react-native';
import {IcApple, IcProfileBlue} from '../../assets/icon';
import styles from './Profile.style';

type ProfileProps = {
  userInfo: {
    name: string;
    email: string;
    provider: string;
  };
};

export default function Profile({userInfo}: ProfileProps) {
  return (
    <View style={styles.profileSection}>
      <IcProfileBlue width={60} height={60} />

      <View style={styles.profileTextContainer}>
        <Text style={styles.name}>{userInfo.name}</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{userInfo.email}</Text>
          {userInfo.provider === 'APPLE' && (
            <IcApple width={18} height={18} style={styles.appleIcon} />
          )}
        </View>
      </View>
    </View>
  );
}
