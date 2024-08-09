import {atom} from 'recoil';
import {RecoilStateKeys} from '../constants/keys';
import {UserInfoType} from '../type/userInfo';

export const userInfoState = atom<UserInfoType>({
  key: RecoilStateKeys.UserInfo,
  default: {username: ''},
});
