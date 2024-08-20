import {Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapper} from '../../styles/common';
import {StackScreenProps} from '../../navigators/types';
import {IcCancel, IcRotate} from '../../assets/icon';
import Button from '../../components/common/Button/Button';
import ResultSwiper from '../../components/ResultSwiper/ResultSwiper/ResultSwiper';
import styles from './AnalyzeResult.styles';
import {useEffect, useMemo, useRef, useState} from 'react';
import CategoryBottomSheet, {
  CategoryBottomSheetRef,
} from '../../components/common/BottomSheet/CategoryBottomSheet/CategoryBottomSheet';
import {Category} from '../../types/dtos/location';
import {AnalyzeCount, AnalyzeState} from '../../constants/states/AnalyzeState';
import {
  ReanalyzeRequest,
  usePatchLocationReAnalyze,
} from '../../hooks/mutations/location/usePatchLocationReAnalyze';

type AnalyzeResultProps = StackScreenProps<'AnalyzeResult'>;
export default function AnalyzeResult({navigation, route}: AnalyzeResultProps) {
  const {result, analyzeState, type} = route.params;

  const indexRef = useRef(0);
  const bottomSheetRef = useRef<CategoryBottomSheetRef>(null);

  const userLocationList = useMemo(() => {
    return result.userLocationList || [];
  }, [result]);

  const title = useMemo(() => {
    if (analyzeState === AnalyzeState.SUCCESS && type === AnalyzeCount.SINGLE)
      return `분석이 완료되었어요!`;
    else if (
      analyzeState === AnalyzeState.SUCCESS &&
      type === AnalyzeCount.MULTIPLE
    )
      return `${result.successCount}개의 명소 분석이 완료되었어요!`;
    else if (analyzeState === AnalyzeState.PARTIAL)
      return `${result.successCount}개의 명소를 캐치했어요!`;
  }, [analyzeState]);

  const subtitle = useMemo(() => {
    if (analyzeState === AnalyzeState.SUCCESS)
      return `이제 스킵에서 ${userLocationList[0].location.placeName}과 관련된 더 많은 
정보를 받아볼 수 있어요`;
    else if (analyzeState === AnalyzeState.PARTIAL)
      return `남은 ${result.failedCount}개는 주소를 확인하기 어려웠어요`;
  }, [analyzeState]);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleIndexChanged(index: number) {
    indexRef.current = index;
  }

  function handleGoDetail() {
    navigation.navigate('Detail', {id: userLocationList[indexRef.current].id});
  }

  function handleOnModify(category: Category) {
    console.log('New Category!', category);

    // validataion - 기존과 같은지 비교
  }

  const {mutate: retry} = usePatchLocationReAnalyze({
    onSuccess: res => {
      console.log('[RE] ', res);
    },
    onError: e => {
      console.error('[RE] ', e);
    },
  });

  function handleRetry() {
    const idx = indexRef.current;
    const request: ReanalyzeRequest = {
      userLocationList: {
        id: userLocationList[idx].id,
        url: userLocationList[idx].photoUrl,
      },
    };

    console.log(request);

    retry(request);
  }
  ``;

  return (
    <SafeAreaView style={{...wrapper}}>
      <IcCancel onPress={handleGoBack} />

      {userLocationList.length > 1 ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <Text style={styles.title}>분석이 완료되었어요!</Text>
      )}

      <Text style={styles.subtitle}>{subtitle}</Text>

      <ResultSwiper
        items={userLocationList}
        onIndexChanged={handleIndexChanged}
        onModify={() => bottomSheetRef.current?.open()}
      />

      <Button text="확인하러 가기" onPress={handleGoDetail} />

      <TouchableOpacity style={styles.retryContainer} onPress={handleRetry}>
        <Text style={styles.retryText}>다시 분석하기</Text>
        <IcRotate />
      </TouchableOpacity>

      {/* 카테고리 수정 바텀시트 */}
      <CategoryBottomSheet ref={bottomSheetRef} onModify={handleOnModify} />
    </SafeAreaView>
  );
}
