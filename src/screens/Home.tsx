import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '../navigators/types';
import {launchImageLibrary} from 'react-native-image-picker';
import {usePostLocation} from '../hooks/mutations/location/usePostLocation';

export default function Home({navigation}: StackScreenProps) {
  const {mutate} = usePostLocation({
    onSuccess: res => {
      console.log('^^ ', res);
      console.log('List!', res.result.userLocationList);
    },
    onError: e => {
      console.error('ㅠㅠ ', e);
    },
  });

  async function goToImageLibrary() {
    const {didCancel, errorCode, errorMessage, assets} =
      await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

    console.log(
      `didCancel: ${didCancel} errorCode: ${errorCode} errorMessage: ${errorMessage}`,
    );

    const formData = new FormData();
    if (assets) {
      console.log('>> ', assets);

      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        console.log('-- ', asset.uri);

        var photo = {
          uri: asset.uri,
          type: 'multipart/form-data',
          name: `${asset.fileName}`,
        };

        // 각 파일을 개별적으로 추가, 파일 이름을 적절히 지정
        formData.append(`file`, photo);
      }

      console.log('***!!!', formData);
      mutate(formData);
    }
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
