import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {IcWarning, IcSad, IcLeft} from '../../assets/icon';
import styles from './Withdraw.style';
import {useDeleteAppleIdMutation} from '../../hooks/mutations/deleteAccount/useDeleteAppleId';
import {useDeleteAccountMutation} from '../../hooks/mutations/deleteAccount/usePostDeleteAccount';
import {useRecoilValue} from 'recoil';
import {userAppleInfoState} from '../../libs/recoil/states/userAppleInfo';
import Modal from '../../components/common/Modal/Modal';
import {userInfoState} from '../../libs/recoil/states/userInfo';
import {useAppleLogin} from '../../hooks/useAppleLogin';
import {theme} from '../../styles';
import {StackScreenProps} from '../../navigators/types';
import {wrapper} from '../../styles/common';
import Icon from '../../components/common/Icon/Icon';

interface AppleInfo {
  email: string;
  identityToken: string;
  authorizationCode: string;
  fullName?: {
    firstName: string;
    lastName: string;
  };
}

type WithdrawProps = StackScreenProps<'Withdraw'>;

export default function Withdraw({navigation}: WithdrawProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const userAppleInfo = useRecoilValue<AppleInfo | null>(userAppleInfoState);
  const userInfo = useRecoilValue<{username: string}>(userInfoState);
  const signInWithApple = useAppleLogin();
  const {DeleteAppleIdMutation} = useDeleteAppleIdMutation();
  const {deleteAccountMutation} = useDeleteAccountMutation();

  if (!userAppleInfo) {
    return (
      <View style={styles.container}>
        <Text>유저 정보를 불러오지 못했습니다.</Text>
      </View>
    );
  }

  console.log('이건 재로그인 전 : ', userAppleInfo.authorizationCode);
  const handleDelete = async () => {
    try {
      const updatedAppleInfo = await signInWithApple();

      if (!updatedAppleInfo) {
        throw new Error('Re-authentication 실패, 업데이트 불가 Apple info.');
      }

      const body = {
        state: null,
        code: updatedAppleInfo.authorizationCode,
        id_token: updatedAppleInfo.identityToken,
        user: {
          email: updatedAppleInfo.email,
          name: {
            firstName: updatedAppleInfo.fullName?.firstName || '',
            lastName: updatedAppleInfo.fullName?.lastName || '',
          },
        },
      };
      DeleteAppleIdMutation.mutate(body, {
        onSuccess: data => {
          console.log('Apple ID 삭제 성공:', data);
          deleteAccountMutation.mutate(undefined, {
            onSuccess: () => {
              Alert.alert('성공', '계정이 성공적으로 삭제되었습니다.');
            },
            onError: (error: any) => {
              console.error('계정 삭제 오류:', body);
              Alert.alert(
                '오류',
                '계정 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
              );
            },
          });
        },
        onError: (error: any) => {
          console.error('Apple ID 삭제 오류:', body);
          Alert.alert(
            '오류',
            'Apple ID 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
          );
        },
      });
    } catch (error) {
      console.error('Apple Sign In Error ---- ✈️', error);
    }
  };

  function handleGoBack() {
    navigation.navigate('TabNavigator');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backIcon}>
        <Icon onPress={handleGoBack} children={<IcLeft />} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollview}>
        <Text style={styles.title}>정말로 스킵을 탈퇴하실 건가요?</Text>
        <Text style={styles.subtitle}>탈퇴 전, 확인해야 될 정보가 있어요.</Text>

        <View style={styles.iconContainer}>
          <IcWarning />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.infoTextTitle}>
            탈퇴 즉시, {userInfo.username}님의 모든 이용 내역은 삭제돼요.
          </Text>
          <Text style={styles.infoText}>
            계정 정보, 등록된 여행지, 친구 등 스킵에서 활동했던 모든 내용들은
            삭제되며, 다시 가입해도 복구되지 않아요!
          </Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            boxType="square"
            tintColors={{
              true: theme.palette.primary,
              false: theme.palette.primary,
            }}
            onCheckColor="#FFFFFF"
            onFillColor={theme.palette.primary}
            onTintColor={theme.palette.primary}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>
            해당 내용을 모두 확인했고, 탈퇴에 동의합니다.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.deleteButton,
          isChecked ? styles.deleteButtonEnabled : styles.deleteButtonDisabled,
        ]}
        onPress={() => setModalVisible(true)}
        disabled={!isChecked}>
        <Text style={styles.deleteButtonText}>탈퇴하기</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete} // Pass the updated handleDelete function
        IconComponent={<IcSad style={styles.modalIcon} />}
        modalTitle="정말로 탈퇴하시겠어요?"
        modalSubtitle={`스킵은 ${userInfo.username}님의 피드백으로 더 발전할 수 있어요. \n 탈퇴하려면 재로그인으로 인증이 필요해요!`}
        modalButtonCancelText="더 써볼래요"
        modalButtonConfirmText="탈퇴할래요"
      />
    </SafeAreaView>
  );
}
