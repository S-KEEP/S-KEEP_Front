import styles from './AnalyzeError.styles';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {StackScreenProps} from '../../navigators/types';
import Button from '../../components/common/Button/Button';
import useAnalyze from '../../hooks/useAnalyze';

type AnalyzeErrorProps = StackScreenProps<'AnalyzeError'>;
export default function AnalyzeError({navigation, route}: AnalyzeErrorProps) {
  const {handleReSelect} = useAnalyze();

  function handleGoMain() {
    navigation.pop();
    navigation.replace('TabNavigator');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../../assets/icon/ic_fail.png')}
          style={{height: 100, width: 100, resizeMode: 'contain'}}
        />
        <Text style={styles.title}>분석 실패</Text>
        <Text style={styles.subtitle}>
          정확한 주소가 담긴 스크린샷이 필요해요
        </Text>
      </View>

      <View style={styles.bottom}>
        <Button
          text="사진 다시 선택하기"
          onPress={() => handleReSelect(navigation)}
        />

        <Button gray text="스킵으로 돌아가기" onPress={handleGoMain} />
      </View>
    </SafeAreaView>
  );
}
