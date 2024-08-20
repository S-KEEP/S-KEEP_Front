import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../styles';
import {flexBox, wrapper} from '../../styles/common';
import {StackScreenProps} from '../../navigators/types';
import {usePostLocation} from '../../hooks/mutations/location/usePostLocation';
import {useEffect} from 'react';
import {
  getAnalyzeCount,
  getAnalyzeState,
} from '../../constants/states/AnalyzeState';

type AnalyzeProps = StackScreenProps<'Analyze'>;
export default function Analyze({navigation, route}: AnalyzeProps) {
  const {formData} = route.params;

  const {mutate} = usePostLocation({
    onSuccess: res => {
      const {errorCode, message, result} = res;

      if (errorCode) {
        console.error(`${errorCode} - ${message}`);
        navigation.pop();
        return;
      }

      console.log('[Analyze] ', res.result);

      navigation.replace('AnalyzeResult', {
        result: result,
        analyzeState: getAnalyzeState(result.failedCount, result.successCount),
        type: getAnalyzeCount(result.failedCount, result.successCount),
      });
    },
    onError: e => {
      console.error('[Analyze] ', e);
    },
  });

  useEffect(() => {
    console.log('Received formData:', formData);

    if (formData) mutate(formData);
  }, [formData]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/icon/ic_loading.gif')}
        style={styles.image}
      />
      <Text style={styles.title}>스크린샷을 분석 중이에요!</Text>
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
    width: 150,
    height: 150,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
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
