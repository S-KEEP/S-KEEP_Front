import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackParamList} from '../navigators/types';
import {Header} from 'react-native/Libraries/NewAppScreen';

type HomeProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Home'>;
};
export default function Home({navigation}: HomeProps) {
  return (
    <View>
      <SafeAreaView>
        <Text>Home</Text>
        <Button
          title="Go to Analyze"
          onPress={() => navigation.navigate('Analyze')}
        />
      </SafeAreaView>
    </View>
  );
}
