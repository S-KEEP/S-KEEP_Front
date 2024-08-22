import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../navigators/TabNavigator';
import {StackMenu} from '../navigators/constants/menu';
import {StackParamList} from '../navigators/types';
import AnalyzeResult from '../screens/AnalyzeResult/AnalyzeResult';
import Detail from '../screens/Detail/Detail';
import Analyze from '../screens/Analyze/Analyze';
import ReAnalyze from '../screens/ReAnalyze/ReAnalyze';
import AnalyzeError from '../screens/AnalyzeError/AnalyzeError';
import Login from '../screens/Login/Login';

import CategoryListScreen from '../screens/CategoryList/CategoryListScreen';
import Withdraw from '../screens/Withdraw/Withdraw';

const Stack = createNativeStackNavigator<StackParamList>();

const screenOptions = {
  headerShown: false,
  headerShadowVisible: false,
};

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* 탭 */}
      <Stack.Screen name={StackMenu.TabNavigator} component={TabNavigator} />

      {/* 로그인, 탈퇴 */}
      <Stack.Screen name={StackMenu.Login} component={Login} />
      <Stack.Screen name={StackMenu.Withdraw} component={Withdraw} />

      {/* 카테고리 상세 */}
      <Stack.Screen
        name={StackMenu.CategoryListScreen}
        component={CategoryListScreen}
      />

      {/* 분석, 재분석 */}
      <Stack.Screen name={StackMenu.Analyze} component={Analyze} />
      <Stack.Screen name={StackMenu.ReAnalyze} component={ReAnalyze} />

      {/* 분석 결과, 실패 */}
      <Stack.Screen name={StackMenu.AnalyzeResult} component={AnalyzeResult} />
      <Stack.Screen name={StackMenu.AnalyzeError} component={AnalyzeError} />

      {/* 장소 상세 */}
      <Stack.Screen name={StackMenu.Detail} component={Detail} />
    </Stack.Navigator>
  );
}
