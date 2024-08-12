import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '../navigators/types';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Home({navigation}: StackScreenProps) {
  async function goToImageLibrary() {
    const {didCancel, errorCode, errorMessage, assets} =
      await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

    console.log(
      `didCancel: ${didCancel} errorCode: ${errorCode} errorMessage: ${errorMessage}`,
    );
    console.log('>> ', assets);
  }

  return (
    <View>
      <SafeAreaView>
        <Text>Home</Text>
        <Button
          title="Go to Analyze"
          onPress={() => navigation.navigate('Analyze')}
        />

        <Button title="이미지 첨부(Max 10)" onPress={goToImageLibrary} />
      </SafeAreaView>
    </View>
  );
}
