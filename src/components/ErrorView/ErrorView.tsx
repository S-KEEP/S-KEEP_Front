import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import styles from './ErrorView.styles';

interface ErrorViewProps {
  title: string;
  description: string;
  buttons: React.ReactNode;
}
export default function ErrorView({
  title,
  description,
  buttons,
}: ErrorViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../../assets/icon/ic_fail.png')}
          style={{height: 100, width: 100, resizeMode: 'contain'}}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{description}</Text>
      </View>

      <View style={styles.bottom}>{buttons}</View>
    </SafeAreaView>
  );
}
