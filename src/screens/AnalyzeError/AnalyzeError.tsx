import styles from './AnalyzeError.styles';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {StackScreenProps} from '../../navigators/types';
import Button from '../../components/common/Button/Button';
import {launchImageLibrary} from 'react-native-image-picker';

type AnalyzeErrorProps = StackScreenProps<'AnalyzeError'>;
export default function AnalyzeError({navigation, route}: AnalyzeErrorProps) {
  async function handleReSelect() {
    const {didCancel, errorCode, errorMessage, assets} =
      await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

    if (didCancel || errorCode) {
      console.log(
        `didCancel: ${didCancel} errorCode: ${errorCode} errorMessage: ${errorMessage}`,
      );
    }

    const formData = new FormData();
    if (assets) {
      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];

        const photo = {
          uri: asset.uri,
          type: 'multipart/form-data',
          name: `${asset.fileName}`,
        };

        formData.append(`file`, photo);
      }

      console.log('[TabNavigator] FormData ', formData);
      navigation.replace('Analyze', {formData});
    }
  }

  function handleGoMain() {
    navigation.pop();
    navigation.replace('TabNavigator');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.image} />
        <Text style={styles.title}>분석 실패</Text>
        <Text style={styles.subtitle}>
          정확한 주소가 담긴 스크린샷이 필요해요
        </Text>
      </View>

      <View style={styles.bottom}>
        <Button text="사진 다시 선택하기" onPress={handleReSelect} />

        <Button text="스킵으로 돌아가기" onPress={handleGoMain} />
      </View>
    </SafeAreaView>
  );
}
