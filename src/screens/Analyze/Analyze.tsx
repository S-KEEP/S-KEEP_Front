import styles from './Analyze.styles';
import {Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '../../navigators/types';
import {usePostLocation} from '../../hooks/mutations/location/usePostLocation';
import {useEffect} from 'react';
import {
  AnalyzeState,
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
      const state = getAnalyzeState(result.failedCount, result.successCount);
      const type = getAnalyzeCount(result.failedCount, result.successCount);

      if (state === AnalyzeState.FAILED) {
        navigation.replace('AnalyzeError');
        return;
      }

      navigation.replace('AnalyzeResult', {
        result: result,
        analyzeState: state,
        type: type,
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
