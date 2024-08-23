import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {theme} from '../../../styles';
import {flexBox} from '../../../styles/common';

interface ModifyButtonProps {
  onPress: () => void;
}
export default function ModifyButton({onPress}: ModifyButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>수정하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...flexBox(),
    backgroundColor: theme.palette.gray1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    ...theme.typography.sb_13,
    color: theme.palette.gray6,
  },
});
