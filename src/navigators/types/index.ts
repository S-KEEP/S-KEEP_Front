import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AnalyzeCountType,
  AnalyzeStateType,
} from '../../constants/states/AnalyzeState';
import {AnalyzeLocationResponse} from '../../hooks/mutations/location/usePostLocation';

export type StackParamList = {
  Home: undefined;
  TabNavigator: undefined;
  Analyze: {formData: FormData};
  AnalyzeResult: {
    result: AnalyzeLocationResponse;
    analyzeState: AnalyzeStateType;
    type: AnalyzeCountType;
  };
  Detail: {id: number};
  Login: undefined;
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

export type StackScreenProps<Screen extends keyof StackParamList> = {
  navigation: NativeStackNavigationProp<StackParamList, Screen>;
  route: RouteProp<StackParamList, Screen>;
};
