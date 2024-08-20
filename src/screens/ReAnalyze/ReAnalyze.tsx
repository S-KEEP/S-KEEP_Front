import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../styles';
import {flexBox, wrapper} from '../../styles/common';
import {StackScreenProps} from '../../navigators/types';
import {useEffect} from 'react';
import {
  getAnalyzeCount,
  getAnalyzeState,
} from '../../constants/states/AnalyzeState';
import {usePatchLocationReAnalyze} from '../../hooks/mutations/location/usePatchLocationReAnalyze';

type ReAnalyzeProps = StackScreenProps<'ReAnalyze'>;
export default function ReAnalyze({navigation, route}: ReAnalyzeProps) {
  const {history, request} = route.params;

  const {mutate: retry} = usePatchLocationReAnalyze({
    onSuccess: res => {
      console.log('[RE] ', res);

      const {result, errorCode, message} = res;
      console.log('[ReAnalyze] Result ', res.result);

      const newResult = result.userLocationList[0];
      console.log('[ReAnalyze] New Result ', newResult);

      const newHistory = history;
      newHistory.userLocationList = newHistory.userLocationList.map(item =>
        item.id === newResult.id ? newResult : item,
      );

      console.log('[ReAnalyze] >> ', history);
      if (result.successCount === 1) {
        navigation.replace('AnalyzeResult', {
          result: newHistory,
          analyzeState: getAnalyzeState(
            newHistory.failedCount,
            newHistory.successCount,
          ),
          type: getAnalyzeCount(
            newHistory.failedCount,
            newHistory.successCount,
          ),
        });
      } else {
        // if (result.failedCount >= 1), 알럿만
        console.error(`${errorCode} - ${message}`);
      }
      navigation.pop();
    },
    onError: e => {
      console.error('[ReAnalyze] ', e);
    },
  });

  useEffect(() => {
    console.log('Received :', history, request);

    retry(request);
  }, [request]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image} />
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
