import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../styles/theme';
import HomeIc from '../assets/icon/home.svg';
import CategoryIc from '../assets/icon/category.svg';
import EtcIc from '../assets/icon/etc.svg';
import {TabMenu} from '../navigators/constants/menu';
import {TabBarLabel} from '../navigators/constants/label';
import Home from '../screens/Home';
import Category from '../screens/CategoryTab';
import Etc from '../screens/EtcTab';
import {TabRouteProps, TabParamList, TabScreenName} from '../navigators/types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const {bottom: bottomSize} = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({route}) => screenOptions({route, bottomSize})}>
      <Tab.Screen
        name={TabMenu.Category}
        component={Category}
        options={{tabBarLabel: TabBarLabel.Category}}
      />

      <Tab.Screen
        name={TabMenu.Home}
        component={Home}
        options={{tabBarLabel: TabBarLabel.Home}}
      />

      <Tab.Screen
        name={TabMenu.Etc}
        component={Etc}
        options={{tabBarLabel: TabBarLabel.Etc}}
      />
    </Tab.Navigator>
  );
}

const getTabBarIcon = (routeName: TabScreenName, focused: boolean) => {
  switch (routeName) {
    case TabMenu.Home:
      return (
        <HomeIc
          width={24}
          height={24}
          fill={focused ? theme.palette.primary : theme.palette.gray4}
        />
      );
    case TabMenu.Category:
      return (
        <CategoryIc
          width={24}
          height={24}
          fill={focused ? theme.palette.primary : theme.palette.gray4}
        />
      );
    case TabMenu.Etc:
      return (
        <EtcIc
          width={24}
          height={24}
          fill={focused ? theme.palette.primary : theme.palette.gray4}
        />
      );
    default:
      return null;
  }
};

const screenOptions: (
  props: TabRouteProps & {bottomSize: number},
) => BottomTabNavigationOptions = ({route, bottomSize}) => ({
  tabBarIcon: ({focused}: {focused: boolean}) =>
    getTabBarIcon(route.name, focused),
  tabBarIconStyle: {
    marginTop: route.name === TabMenu.Home ? 17 : 4,
  },
  tabBarActiveTintColor: theme.palette.primary,
  tabBarInactiveTintColor: theme.palette.gray4,
  tabBarStyle: {
    height: bottomSize ? 50 + bottomSize : 60,
    borderTopColor: theme.palette.gray1,
  },
  tabBarItemStyle: {
    gap: 0,
    paddingVertical: 4,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: '500' as const,
    marginBottom: bottomSize ? 0 : 4,
  },
  headerShown: false,
  headerShadowVisible: false,
});
