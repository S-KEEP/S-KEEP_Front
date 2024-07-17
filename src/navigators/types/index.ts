import {RouteProp} from '@react-navigation/native';

export type StackParamList = {Home: undefined; TabNavigator: undefined};

export type TabParamList = {
  Home: undefined;
  Category: undefined;
  Etc: undefined;
  Friend: undefined;
  Map: undefined;
};

export type StackScreenName = keyof StackParamList;
export type TabScreenName = keyof TabParamList;

export type TabRouteProps = {
  route: RouteProp<TabParamList, TabScreenName>;
};
