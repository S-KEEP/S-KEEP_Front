import {Text, Touchable, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapper} from '../../styles/common';
import {StackScreenProps} from '../../navigators/types';
import {IcCancel, IcRotate} from '../../assets/icon';
import Button from '../../components/common/Button/Button';
import ResultSwiper from '../../components/ResultSwiper/ResultSwiper/ResultSwiper';
import dummies from './dummies.json';
import styles from './AnalyzeResult.styles';
import {useState} from 'react';

export default function AnalyzeResult({navigation}: StackScreenProps) {
  const [result, setResult] = useState(dummies.results[0]);

  function handleGoBack() {
    navigation.pop();
  }
  function handleGoDetail() {
    navigation.navigate('Detail');
  }
  function handleRetry() {
    if (result.length > 1) setResult(dummies.results[1]);
    else setResult(dummies.results[0]);
  }

  return (
    <SafeAreaView style={{...wrapper}}>
      <IcCancel onPress={handleGoBack} />

      {result.length > 1 ? (
        <Text style={styles.title}>
          {result.length}개의 명소 분석이 완료되었어요!
        </Text>
      ) : (
        <Text style={styles.title}>분석이 완료되었어요!</Text>
      )}

      <Text style={styles.subtitle}>
        이제 스킵에서 {result[0].title}과 관련된 더 많은 정보를 받아볼 수 있어요
      </Text>

      <ResultSwiper items={result} />

      <Button text="확인하러 가기" onPress={handleGoDetail} />

      <TouchableOpacity style={styles.retryContainer} onPress={handleRetry}>
        <Text style={styles.retryText}>다시 분석하기</Text>
        <IcRotate />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
