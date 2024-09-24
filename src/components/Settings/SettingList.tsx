import React, {useState} from 'react';
import {View, Linking, Text} from 'react-native';
import SettingItem from './SettingItem';
import styles from './Setting.style';
import VersionCheck from 'react-native-version-check';
import useNavigator from '../../navigators/hooks/useNavigator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  sendCategoryPush,
  sendDetailPush,
} from '../../hooks/mutations/test/useTestNotification';

type SettingsListProps = {
  onLogout: () => void;
};

const version = VersionCheck.getCurrentVersion();

export default function SettingsList({onLogout}: SettingsListProps) {
  const {stackNavigation} = useNavigator();

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error("Couldn't load page -- ✈️", err),
    );
  };

  /* 푸시 테스트용 코드 */
  const [isTest, setIsTest] = useState(false);

  return (
    <View style={styles.settingsContainer}>
      <SettingItem
        text="서비스 이용약관"
        onPress={() =>
          openLink(
            'https://smooth-hare-3c0.notion.site/0d55f848b86348a1bf1c052bad4755b4?pvs=21',
          )
        }
      />
      <SettingItem
        text="개인정보 처리방침"
        onPress={() =>
          openLink(
            'https://smooth-hare-3c0.notion.site/b2736802b84348d8b0a36fc612c64d28?pvs=21',
          )
        }
      />
      <SettingItem text="로그아웃" onPress={onLogout} />
      <SettingItem
        text="회원탈퇴"
        onPress={() => stackNavigation.navigate('Withdraw')}
      />

      <SettingItem
        text="버전 정보"
        extraInfo={version}
        onPress={() => setIsTest(!isTest)}
      />

      {/*  푸시 테스트용 코드  */}
      {isTest && <TestItem />}
    </View>
  );
}

/*  푸시 테스트용 코드  */
const TestItem = () => {
  return (
    <View style={{padding: 20}}>
      <TouchableOpacity onPress={() => sendCategoryPush()}>
        <Text>카테고리 푸시 보내기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => sendDetailPush()}>
        <Text>명소 푸시 보내기</Text>
      </TouchableOpacity>
    </View>
  );
};
