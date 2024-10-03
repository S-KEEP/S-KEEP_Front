import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '../../styles';
import {flexBox} from '../../styles/common';
import {NotificationDTO} from '../../hooks/queries/notification/useGetNotification';
import {usePatchNotification} from '../../hooks/mutations/notification/usePatchNotification';
import {useQueryClient} from '@tanstack/react-query';
import {NOTIFICATION_KEYS} from '../../hooks/queries/QueryKeys';
import {formatDate, getCategoryName} from '../../utils/pushUtils';

interface NotificationItemProps {
  item: NotificationDTO;
}
export default function NotificationItem({item}: NotificationItemProps) {
  const queryClient = useQueryClient();

  const {mutate: checkNotitifcation} = usePatchNotification({
    onSuccess(res) {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_KEYS.all,
      });
    },
    onError(e) {
      console.error(e);
    },
  });
  function handleOnPress() {
    /* 알림 타입 별로 랜딩 로직 수행 */
    // 1. 푸시 확인 API
    checkNotitifcation({id: item.id, type: item.type});
  }

  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        {
          backgroundColor: pressed
            ? !item.isChecked
              ? '#43C7FF26'
              : 'white'
            : !item.isChecked
              ? '#43C7FF1A'
              : 'white',
        },
      ]}
      onPress={handleOnPress}>
      <View style={styles.topBox}>
        <Text style={styles.subtitle}>{getCategoryName(item.type)}</Text>
        {!item.isChecked && <View style={styles.flag} />}
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
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
