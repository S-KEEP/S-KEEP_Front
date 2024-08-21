import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../styles/theme';
import {TabMenu} from '../navigators/constants/menu';
import {TabBarLabel} from '../navigators/constants/label';
import Home from '../screens/Home';
import Category from '../screens/Category/CategoryScreen';
import {TabRouteProps, TabParamList, TabScreenName} from '../navigators/types';
import {IcCategory, IcEtc, IcHome} from '../assets/icon';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import useNavigator from './hooks/useNavigator';
import SettingScreen from '../screens/Settings/SettingScreen';
import useShareExtension from '../hooks/useShareExtension';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  useShareExtension();

  const {bottom: bottomSize} = useSafeAreaInsets();
  const {stackNavigation} = useNavigator();

  async function handleGoToGallery() {
    const {didCancel, errorCode, errorMessage, assets} =
      await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

    if (didCancel || errorCode) {
      console.log(
        `didCancel: ${didCancel} errorCode: ${errorCode} errorMessage: ${errorMessage}`,
      );
    }

    const formData = new FormData();
    if (assets) {
      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];

        const photo = {
          uri: asset.uri,
          type: 'multipart/form-data',
          name: `${asset.fileName}`,
        };

        formData.append(`file`, photo);
      }

      console.log('[TabNavigator] FormData ', formData);
      stackNavigation.navigate('Analyze', {formData});
    }
  }

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
        options={{
          tabBarLabel: TabBarLabel.Home,
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              style={[props.style, {marginBottom: 17}]}
              onPress={handleGoToGallery}>
              {getTabBarIcon(TabMenu.Home, false)}
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name={TabMenu.Etc}
        component={SettingScreen}
        options={{tabBarLabel: TabBarLabel.Etc}}
      />
    </Tab.Navigator>
  );
}

const iconStyle: StyleProp<ViewStyle> = {
  position: 'absolute',
  bottom: 0,
};

const getTabBarIcon = (routeName: TabScreenName, focused: boolean) => {
  const iconColor = focused ? theme.palette.primary : theme.palette.gray4;

  switch (routeName) {
    case TabMenu.Home:
      return (
        <IcHome
          width={60}
          height={60}
          fill={focused ? theme.palette.primary : theme.palette.gray4}
          style={iconStyle}
        />
      );
    case TabMenu.Category:
      return <IcCategory width={24} height={24} fill={iconColor} />;
    case TabMenu.Etc:
      return <IcEtc width={24} height={24} fill={iconColor} />;
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
    marginTop: 4, // route.name === TabMenu.Home ? 17 :
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
