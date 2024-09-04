import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {theme} from '../../../styles';
import {flexBox} from '../../../styles/common';

interface ButtonProps {
  text: string;
  gray?: boolean;
  onPress: () => void;
}
export default function Button({text, onPress, gray}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, gray && styles.gray]}
      onPress={onPress}>
      <Text style={[styles.text, gray && styles.gray]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...flexBox(),
    backgroundColor: theme.palette.primary,
    borderRadius: 10,
    paddingVertical: 20,
  },
  gray: {
    backgroundColor: theme.palette.gray2,
    color: theme.palette.gray5,
  },
  text: {
    ...theme.typography.button_sb_15,
    color: theme.palette.white,
  },
});
