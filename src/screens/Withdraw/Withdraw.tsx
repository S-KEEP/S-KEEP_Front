import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {IcWarning, IcSad} from '../../assets/icon';
import styles from './Withdraw.style';
import {useDeleteAppleIdMutation} from '../../hooks/mutations/deleteAccount/useDeleteAppleId';
import {useDeleteAccountMutation} from '../../hooks/mutations/deleteAccount/usePostDeleteAccount';
import {useRecoilValue} from 'recoil';
import {userAppleInfoState} from '../../libs/recoil/states/userAppleInfo';
import Modal from '../../components/common/Modal/Modal';
import {userInfoState} from '../../libs/recoil/states/userInfo';

export default function Withdraw() {
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const userAppleInfo = useRecoilValue(userAppleInfoState);
  const userInfo = useRecoilValue(userInfoState);

  if (!userAppleInfo) {
    return (
      <View style={styles.container}>
        <Text>유저 정보를 불러오지 못했습니다.</Text>
      </View>
    );
  }
  const {email, identityToken, authorizationCode, fullName} = userAppleInfo;
  const {firstName, lastName} = fullName || {firstName: '', lastName: ''};

  const {DeleteAppleIdMutation} = useDeleteAppleIdMutation();
  const {deleteAccountMutation} = useDeleteAccountMutation();

  const handleDelete = () => {
    if (isChecked) {
      const body = {
        state: null,
        code: authorizationCode,
        id_token: identityToken,
        user: {
          email,
          name: {
            firstName,
            lastName,
          },
        },
      };

      console.log(body.user);
      // Apple ID 삭제 Mutation 호출
      DeleteAppleIdMutation.mutate(body, {
        onSuccess: data => {
          console.log('Apple ID 삭제 성공:', data);

          // 계정 삭제 Mutation 호출
          deleteAccountMutation.mutate(undefined, {
            onSuccess: () => {
              console.log('계정 삭제 성공.');
              setModalVisible(false); // 모달 닫기
              Alert.alert('성공', '계정이 성공적으로 삭제되었습니다.');
            },
            onError: error => {
              console.error('계정 삭제 오류:', error);
              Alert.alert(
                '오류',
                '계정 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
              );
            },
          });
        },
        onError: error => {
          console.error('Apple ID 삭제 오류:', error);
          Alert.alert(
            '오류',
            'Apple ID 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
          );
        },
      });
    }
  };

  return (
    <View style={styles.container}>
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
          계정 정보, 등록된 명소, 친구 등 스킵에서 활동했던 모든 내용들은
          삭제되며, 다시 가입해도 복구되지 않아요!
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked} onValueChange={setIsChecked} />
        <Text style={styles.checkboxText}>
          해당 내용을 모두 확인했고, 탈퇴에 동의합니다.
        </Text>
      </View>

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
        onConfirm={handleDelete}
        IconComponent={<IcSad style={styles.modalIcon} />}
        modalTitle="정말로 탈퇴하시겠어요?"
        modalSubtitle={`스킵은 ${userInfo.username}님의 피드백으로 더 발전할 수 있어요.`}
        modalButtonCancelText="더 써볼래요"
        modalButtonConfirmText="탈퇴할래요"
      />
    </View>
  );
}
