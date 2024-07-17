import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {TabMenu} from '../navigators/constants/menu';
import {TabNavigatorIcon} from '../navigators/constants/icon';
import {TabBarLabel} from '../navigators/constants/label';
import {TabRouteProps, TabParamList, TabScreenName} from '../navigators/types';
import Category from '../screens/CategoryTab';
import Etc from '../screens/EtcTab';
import Home from '../screens/Home';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../styles/theme';
import HomeIc from '../assets/icon/home.svg';
import CategoryIc from '../assets/icon/category.svg';
import EtcIc from '../assets/icon/etc.svg';

import Icon from '../components/Icon';
import React from 'react';
import Friend from '../screens/FriendTab';
import Map from '../screens/MapTab';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const {bottom: bottomSize} = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({route}) => screenOptions({route, bottomSize})}>
      <Tab.Screen
        name={TabMenu.Friend}
        component={Friend}
        options={{tabBarLabel: TabBarLabel.Friend}}
      />
      <Tab.Screen
        name={TabMenu.Home}
        component={Home}
        options={{tabBarLabel: TabBarLabel.Home}}
      />
      <Tab.Screen
        name={TabMenu.Category}
        component={Category}
        options={{tabBarLabel: TabBarLabel.Category}}
      />
      <Tab.Screen
        name={TabMenu.Map}
        component={Map}
        options={{tabBarLabel: TabBarLabel.Map}}
      />

      <Tab.Screen
        name={TabMenu.Etc}
        component={Etc}
        options={{tabBarLabel: TabBarLabel.Etc}}
      />
    </Tab.Navigator>
  );
}

const screenOptions: (
  props: TabRouteProps & {bottomSize: number},
) => BottomTabNavigationOptions = ({route, bottomSize}) => ({});
