import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {IcWarning} from '../../assets/icon';
import styles from './DeleteAccountScreen.style';
import {useDeleteAppleIdMutation} from '../../hooks/mutations/deleteAccount/useDeleteAppleId';
import { useDeleteAccountMutation } from '../../hooks/mutations/deleteAccount/usePostDeleteAccount';

export default function DeleteAccountScreen({}) {
  const [isChecked, setIsChecked] = useState(false);

  const idToken = 'your-id-token';
  const code = 'your-code';
  const email = 'user@example.com';
  const firstName = 'FirstName';
  const lastName = 'LastName';

  const {DeleteAppleIdMutation} = useDeleteAppleIdMutation();
  const {deleteAccountMutation} = useDeleteAccountMutation();

  const handleDelete = () => {
    if (isChecked) {
      const body = {
        state: null,
        code: code,
        id_token: idToken,
        user: {
          email: email,
          name: {
            firstName: firstName,
            lastName: lastName,
          },
        },
      };

      // First, delete the Apple ID
      DeleteAppleIdMutation.mutate(body, {
        onSuccess: data => {
          console.log('Apple ID deletion successful:', data);

          // Now, call the second mutation to delete the account
          deleteAccountMutation.mutate(undefined, {
            onSuccess: () => {
              console.log('Account deletion successful.');
              Alert.alert('Success', 'Your account has been deleted.');
            },
            onError: error => {
              console.error('Account deletion error:', error);
              Alert.alert(
                'Error',
                'An error occurred while deleting your account. Please try again.',
              );
            },
          });
        },
        onError: error => {
          console.error('Apple ID deletion error:', error);
          Alert.alert(
            'Error',
            'An error occurred while deleting your Apple ID. Please try again.',
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
