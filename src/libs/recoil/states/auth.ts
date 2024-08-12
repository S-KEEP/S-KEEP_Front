import {atom} from 'recoil';
import {AuthStateType} from '../type/auth';
import {RecoilStateKeys} from '../constants/keys';

export const authState = atom<AuthStateType>({
  key: RecoilStateKeys.Auth,
  default: {isAuthenticated: false},
});
