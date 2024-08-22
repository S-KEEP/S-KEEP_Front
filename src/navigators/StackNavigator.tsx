import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../navigators/TabNavigator';
import {StackMenu} from '../navigators/constants/menu';
import {StackParamList} from '../navigators/types';
import AnalyzeResult from '../screens/AnalyzeResult/AnalyzeResult';
import Detail from '../screens/Detail/Detail';
import Analyze from '../screens/Analyze/Analyze';
import ReAnalyze from '../screens/ReAnalyze/ReAnalyze';
import AnalyzeError from '../screens/AnalyzeError/AnalyzeError';
import LoginScreen from '../screens/Login/LoginScreen';
import DeleteAccountScreen from '../screens/DeleteAccount/DeleteAccountScreen';
import CategoryListScreen from '../screens/CategoryList/CategoryListScreen';

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

      {/* 로그인 */}
      <Stack.Screen name={StackMenu.LoginScreen} component={LoginScreen} />

      {/* 탈퇴 */}
      <Stack.Screen
        name={StackMenu.DeleteAccountScreen}
        component={DeleteAccountScreen}
      />

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
