import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {IcRight} from '../../assets/icon';
import styles from './Setting.style';

type SettingItemProps = {
  text: string;
  onPress?: () => void;
  extraInfo?: string;
};

export default function SettingItem({
  text,
  onPress,
  extraInfo,
}: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <Text style={styles.settingText}>{text}</Text>
      {extraInfo ? (
        <Text style={styles.versionText}>{extraInfo}</Text>
      ) : (
        <IcRight />
      )}
    </TouchableOpacity>
  );
}
