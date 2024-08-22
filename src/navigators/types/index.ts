import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AnalyzeCountType,
  AnalyzeStateType,
} from '../../constants/states/AnalyzeState';
import {AnalyzeLocationResponse} from '../../hooks/mutations/location/usePostLocation';
import {ReanalyzeRequest} from '../../hooks/mutations/location/usePatchLocationReAnalyze';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';

export type StackParamList = {
  TabNavigator: undefined;

  Login: undefined;
  Withdraw: undefined;

  Analyze: {formData: FormData};
  AnalyzeResult: {
    result: AnalyzeLocationResponse;
    analyzeState: AnalyzeStateType;
    type: AnalyzeCountType;
  };
  AnalyzeError: undefined;
  ReAnalyze: {history: AnalyzeLocationResponse; request: ReanalyzeRequest};
  Detail: {id: number};

  CategoryListScreen: {title: string; description: string};
};

export type TabParamList = {
  HomeTab: undefined;
  CategoryTab: undefined;
  SettingTab: undefined;
};

export type StackScreenName = keyof StackParamList;
export type TabScreenName = keyof TabParamList;

export type TabRouteProps = {
  route: RouteProp<TabParamList, TabScreenName>;
};

/**
 * Screen Props
 * */
export type StackScreenProps<Screen extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, Screen>;

export type TabScreenProps<Screen extends keyof TabParamList> =
  BottomTabScreenProps<TabParamList, Screen>;

// Stack 中 Bottom Tab 중첩된 화면에서 사용
export type TabOfStackScreenProps<
  StackScreen extends keyof StackParamList,
  TabScreen extends keyof TabParamList,
> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, TabScreen>,
  NativeStackScreenProps<StackParamList, StackScreen>
>;
