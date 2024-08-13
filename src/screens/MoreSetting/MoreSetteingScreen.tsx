import {View, Text, ScrollView} from 'react-native';
import {IcApple, IcProfile} from '../../assets/icon';
import {useGetUserInfoQuery} from '../../hooks/queries/moreSettings/useGetUserInfo';
import styles from './MoreSettingScreen.style';
import Settings from '../../components/MoreSetting/Settings';

export default function MoreSettingScreen() {
  const userInfoData = useGetUserInfoQuery();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <IcProfile width={60} height={60} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>{userInfoData.user.name}</Text>
          <View style={styles.emailContainer}>
            <Text style={styles.email}>{userInfoData.user.email}</Text>
            {userInfoData.user.provider === 'APPLE' && (
              <IcApple width={18} height={18} style={styles.appleIcon} />
            )}
          </View>
        </View>
      </View>

      <View style={styles.divider} />
      <Settings />
    </ScrollView>
  );
}
