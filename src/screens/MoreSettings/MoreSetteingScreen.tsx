import {Button, SafeAreaView, View} from 'react-native';
import useNavigator from '../../navigators/hooks/useNavigator';

export default function MoreSettingScreen() {
  const {stackNavigation} = useNavigator();
  function handle() {
    stackNavigation.navigate('Detail', {id: 470});
  }
  return (
    <SafeAreaView>
      <Button title="GO" onPress={handle} />
    </SafeAreaView>
  );
}
