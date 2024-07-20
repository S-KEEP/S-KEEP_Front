import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, wrapper} from '../../styles/common';
import {theme} from '../../styles';
import {StackScreenProps} from '../../navigators/types';
import {IcCancel, IcRotate} from '../../assets/icon';
import Button from '../../components/common/Button/Button';
import ResultSwiper from '../../components/ResultSwiper/ResultSwiper/ResultSwiper';
import dummies from './dummies.json';
import styles from './AnalyzeResult.styles';

export default function AnalyzeResult({navigation}: StackScreenProps) {
  const result = dummies.results;

  return (
    <SafeAreaView style={{...wrapper}}>
      <IcCancel onPress={() => navigation.pop()} />

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

      <Button
        text="확인하러 가기"
        onPress={() => navigation.navigate('Detail')}
      />

      <View style={styles.retryContainer}>
        <Text style={styles.retryText}>다시 분석하기</Text>
        <IcRotate />
      </View>
    </SafeAreaView>
  );
}
