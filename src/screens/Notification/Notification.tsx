import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperFull} from '../../styles/common';
import {Text} from 'react-native';

export default function Notification() {
  return (
    <SafeAreaView style={{...wrapperFull}}>
      <Text>Notifiaction</Text>
    </SafeAreaView>
  );
}
