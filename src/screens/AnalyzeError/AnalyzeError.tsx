import {StyleSheet} from 'react-native';
import {flexBox, wrapper} from '../../styles/common';
import {SafeAreaView} from 'react-native-safe-area-context';

import {StackScreenProps} from '../../navigators/types';
import Button from '../../components/common/Button/Button';
import useAnalyze from '../../hooks/useAnalyze';
import ErrorView from '../../components/ErrorView/ErrorView';

type AnalyzeErrorProps = StackScreenProps<'AnalyzeError'>;
export default function AnalyzeError({navigation, route}: AnalyzeErrorProps) {
  const {handleReSelect} = useAnalyze();

  function handleGoMain() {
    navigation.pop();
    navigation.replace('TabNavigator');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ErrorView
        title="분석 실패"
        description="정확한 주소가 담긴 스크린샷이 필요해요"
        buttons={
          <>
            <Button
              text="사진 다시 선택하기"
              onPress={() => handleReSelect(navigation)}
            />

            <Button gray text="스킵으로 돌아가기" onPress={handleGoMain} />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...wrapper,
    ...flexBox('column', 'space-between'),

    paddingTop: 120,
    paddingBottom: 100,
  },
});
