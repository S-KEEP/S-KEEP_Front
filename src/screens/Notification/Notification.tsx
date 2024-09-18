import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapper, wrapperFull} from '../../styles/common';
import {FlatList, Text, View} from 'react-native';
import {styles} from './Notification.styles';
import Icon from '../../components/common/Icon/Icon';
import {IcLeft} from '../../assets/icon';
import {StackScreenProps} from '../../navigators/types';
import dummies from './dummies.json';
import NotificationItem, {
  NotificationDTO,
} from '../../components/Notification/NotificationItem';

type NotificationProps = StackScreenProps<'Notification'>;
export default function Notification({navigation}: NotificationProps) {
  return (
    <SafeAreaView style={{...wrapperFull, paddingBottom: 0}}>
      <View style={styles.header}>
        <Icon onPress={() => navigation.pop()} children={<IcLeft />} />
      </View>

      <Text style={styles.title}>알림</Text>

      <FlatList
        data={dummies}
        renderItem={({item}: {item: NotificationDTO}) => (
          <NotificationItem item={item} />
        )}
      />
    </SafeAreaView>
  );
}
