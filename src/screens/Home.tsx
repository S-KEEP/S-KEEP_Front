import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '../navigators/types';

export default function Home({navigation}: StackScreenProps) {
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
