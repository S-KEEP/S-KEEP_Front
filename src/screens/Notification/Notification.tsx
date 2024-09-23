import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperFull} from '../../styles/common';
import {FlatList, Text, View} from 'react-native';
import {styles} from './Notification.styles';
import Icon from '../../components/common/Icon/Icon';
import {IcLeft, IcNotiEmpty} from '../../assets/icon';
import {StackScreenProps} from '../../navigators/types';
import NotificationItem from '../../components/Notification/NotificationItem';
import useGetNotification, {
  NotificationDTO,
} from '../../hooks/queries/notification/useGetNotification';

type NotificationProps = StackScreenProps<'Notification'>;
export default function Notification({navigation}: NotificationProps) {
  const {data, loadMore, isFetching, hasNextPage} = useGetNotification(1);

  return (
    <SafeAreaView style={{...wrapperFull, paddingBottom: 0}}>
      <View style={styles.header}>
        <Icon onPress={() => navigation.pop()} children={<IcLeft />} />
      </View>

      <Text style={styles.title}>알림</Text>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}: {item: NotificationDTO}) => (
          <NotificationItem item={item} />
        )}
        onEndReached={hasNextPage ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={EmptyNotificationList}
      />
    </SafeAreaView>
  );
}

function EmptyNotificationList() {
  return (
    <View style={styles.emptyContainer}>
      <IcNotiEmpty />
      <Text style={styles.emptyText}>아직 알림이 없어요!</Text>
    </View>
  );
}
