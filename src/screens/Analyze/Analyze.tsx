import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../styles';
import {flexBox, wrapper} from '../../styles/common';
import {StackScreenProps} from '../../navigators/types';

export default function Analyze({navigation}: StackScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image} />
      <Text
        onPress={() => navigation.navigate('AnalyzeResult')}
        style={styles.title}>
        스크린샷을 분석 중이에요!
      </Text>
      <Text style={styles.subtitle}>조금만 기다려주세요</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...wrapper,
    ...flexBox('column'),
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
  },
  title: {
    ...theme.typography.title_sb_21,
    color: theme.palette.black,
    marginTop: 50,
  },
  subtitle: {
    ...theme.typography.title_m_16,
    color: theme.palette.gray5,
    marginTop: 11,
  },
});
