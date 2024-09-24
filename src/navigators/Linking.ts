import {LinkingOptions} from '@react-navigation/native';
import {StackParamList} from './types';

export const DEEPLINK_PREFIX_URL = ['kakao378c5d01c3e4b03529594678b0a76911://'];

const linking: LinkingOptions<StackParamList> = {
  prefixes: DEEPLINK_PREFIX_URL,
  config: {
    screens: {
      TabNavigator: {
        screens: {
          SettingTab: {
            path: 'kakaolink',
          },
        },
      },
      Detail: {
        path: 'detail/:id',
        parse: {
          id: id => `${id}`,
        },
      },
      CategoryList: {
        path: 'category/:id',
        parse: {
          id: id => `${id}`,
        },
      },
    },
  },
};

export default linking;
