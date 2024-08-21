import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {IcWarning} from '../../assets/icon';
import styles from './DeleteAccountScreen.style';

export default function DeleteAccountScreen({}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleDelete = () => {
    if (isChecked) {
      console.log('Account deletion confirmed.');
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
