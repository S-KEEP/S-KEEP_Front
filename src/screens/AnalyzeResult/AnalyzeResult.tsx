import {Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapper} from '../../styles/common';
import {StackScreenProps} from '../../navigators/types';
import {IcCancel, IcRotate} from '../../assets/icon';
import Button from '../../components/common/Button/Button';
import ResultSwiper from '../../components/ResultSwiper/ResultSwiper/ResultSwiper';
import styles from './AnalyzeResult.styles';
import {useEffect, useRef} from 'react';
import CategoryBottomSheet from '../../components/common/BottomSheet/CategoryBottomSheet/CategoryBottomSheet';

type AnalyzeResultProps = StackScreenProps<'AnalyzeResult'>;
export default function AnalyzeResult({navigation, route}: AnalyzeResultProps) {
  const {userLocationList} = route.params;

  const indexRef = useRef(0);

  useEffect(() => {
    console.log('userLocationList', userLocationList);
  }, [userLocationList]);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleIndexChanged(index: number) {
    indexRef.current = index;
  }

  function handleGoDetail() {
    navigation.navigate('Detail', {id: userLocationList[indexRef.current].id});
  }

  function handleRetry() {}

  return (
    <SafeAreaView style={{...wrapper}}>
      <IcCancel onPress={handleGoBack} />

      {userLocationList.length > 1 ? (
        <Text style={styles.title}>
          {userLocationList.length}개의 명소 분석이 완료되었어요!
        </Text>
      ) : (
        <Text style={styles.title}>분석이 완료되었어요!</Text>
      )}

      <Text style={styles.subtitle}>
        이제 스킵에서 인천대공원과 관련된 더 많은 정보를 받아볼 수 있어요
      </Text>

      <ResultSwiper
        items={userLocationList}
        onIndexChanged={handleIndexChanged}
        onModify={() => {}}
      />

      <Button text="확인하러 가기" onPress={handleGoDetail} />

      <TouchableOpacity style={styles.retryContainer} onPress={handleRetry}>
        <Text style={styles.retryText}>다시 분석하기</Text>
        <IcRotate />
      </TouchableOpacity>

      {/* 카테고리 수정 바텀시트 */}
      <CategoryBottomSheet />
    </SafeAreaView>
  );
}
