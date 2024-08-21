import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {IcWarning} from '../../assets/icon';
import styles from './DeleteAccountScreen.style';
import {useDeleteAppleIdMutation} from '../../hooks/mutations/deleteAccount/useDeleteAppleId';
import {useDeleteAccountMutation} from '../../hooks/mutations/deleteAccount/usePostDeleteAccount';
import {useRecoilValue} from 'recoil';
import {userAppleInfoState} from '../../libs/recoil/states/userAppleInfo';

export default function DeleteAccountScreen() {
  const [isChecked, setIsChecked] = useState(false);

  // Recoil 상태에서 사용자 정보 가져오기
  const userAppleInfo = useRecoilValue(userAppleInfoState);

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
      console.log('바디는', body);

      // Apple ID 삭제 Mutation 호출
      DeleteAppleIdMutation.mutate(body, {
        onSuccess: data => {
          console.log('Apple ID 삭제 성공:', data);

          // 계정 삭제 Mutation 호출
          deleteAccountMutation.mutate(undefined, {
            onSuccess: () => {
              console.log('계정 삭제 성공.');
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
        <Text style={styles.infoText}>
          탈퇴 즉시, 님의 모든 이용 내역은 삭제돼요.
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
        onPress={handleDelete}
        disabled={!isChecked}>
        <Text style={styles.deleteButtonText}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  );
}
