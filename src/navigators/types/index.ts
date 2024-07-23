import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type StackParamList = {
  Home: undefined;
  TabNavigator: undefined;
  Analyze: undefined;
  AnalyzeResult: undefined;
  Detail: undefined;
};

export type TabParamList = {
  Home: undefined;
  Category: undefined;
  Etc: undefined;
};

export type StackScreenName = keyof StackParamList;
export type TabScreenName = keyof TabParamList;

export type TabRouteProps = {
  route: RouteProp<TabParamList, TabScreenName>;
};

export type StackScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList>;
};
