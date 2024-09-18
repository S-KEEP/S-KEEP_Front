import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '../../styles';
import {flexBox} from '../../styles/common';

export interface NotificationDTO {
  title: string;
  date: string;
  type: string;
  isRead: boolean;
}
interface NotificationItemProps {
  item: NotificationDTO;
}
export default function NotificationItem({item}: NotificationItemProps) {
  function handleOnPress() {
    /* 알림 타입 별로 랜딩 로직 수행 */
  }

  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? '#43C7FF1A' : 'white'},
        styles.container,
      ]}
      onPress={handleOnPress}>
      <View style={styles.topBox}>
        <Text style={styles.subtitle}>{item.type}</Text>
        {!item.isRead && <View style={styles.flag} />}
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 27,
  },
  topBox: {
    ...flexBox('row', 'flex-start'),
    gap: 6,
  },
  flag: {
    width: 6,
    height: 6,
    borderRadius: 100,
    backgroundColor: theme.palette.primary,
  },
  subtitle: {
    ...theme.typography.text_m_13,
    color: theme.palette.gray4,
  },
  title: {
    ...theme.typography.body_m_15,
    marginTop: 3,
    marginBottom: 5,
  },
  date: {
    ...theme.typography.text_m_11,
    color: theme.palette.gray4,
  },
});
