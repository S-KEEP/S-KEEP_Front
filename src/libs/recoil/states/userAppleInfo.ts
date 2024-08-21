import {atom} from 'recoil';
import {RecoilStateKeys} from '../constants/keys';

export interface UserAppleInfoType {
  email: string;
  user: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  identityToken: string;
  authorizationCode: string;
}

export const userAppleInfoState = atom<UserAppleInfoType>({
  key: RecoilStateKeys.UserAppleInfo,
  default: {
    email: '',
    user: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
    identityToken: '',
    authorizationCode: '',
  },
});
