import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../navigators/TabNavigator';
import {StackMenu} from '../navigators/constants/menu';
import {StackParamList} from '../navigators/types';
import Home from '../screens/Home';
import AnalyzeResult from '../screens/AnalyzeResult/AnalyzeResult';
import Detail from '../screens/Detail/Detail';
import Analyze from '../screens/Analyze/Analyze';
import ReAnalyze from '../screens/ReAnalyze/ReAnalyze';

const Stack = createNativeStackNavigator<StackParamList>();

const screenOptions = {
  headerShown: false,
  headerShadowVisible: false,
};

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={StackMenu.TabNavigator} component={TabNavigator} />
      <Stack.Screen name={StackMenu.Home} component={Home} />

      <Stack.Screen name={StackMenu.Analyze} component={Analyze} />
      <Stack.Screen name={StackMenu.AnalyzeResult} component={AnalyzeResult} />
      <Stack.Screen name={StackMenu.ReAnalyze} component={ReAnalyze} />
      <Stack.Screen name={StackMenu.Detail} component={Detail} />
    </Stack.Navigator>
  );
}
