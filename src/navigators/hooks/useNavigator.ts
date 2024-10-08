import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList, TabParamList} from '../types/index';

const useNavigator = () => {
  const stackNavigation = useNavigation<NavigationProp<StackParamList>>();
  const tabNavigation = useNavigation<NavigationProp<TabParamList>>();

  return {stackNavigation, tabNavigation};
};

export default useNavigator;
