import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {theme} from '../../../styles';
import {flexBox} from '../../../styles/common';

interface ButtonProps {
  text: string;
  onPress: () => void;
}
export default function Button({text, onPress}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...flexBox(),
    backgroundColor: theme.palette.primary,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 122,
  },
  text: {
    ...theme.typography.button_sb_15,
    color: theme.palette.white,
  },
});
