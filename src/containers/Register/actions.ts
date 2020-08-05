import { IRegisterFormValues } from './types';
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESSED } from './constants';
import { IUserProfile } from '../Profile/types';

export const signInAction = (data: IRegisterFormValues) => ({
  type: SIGN_IN_REQUEST,
  data,
});

export const signInSuccessed = (user: IUserProfile, token: string) => ({
  type: SIGN_IN_SUCCESSED,
  user,
  token,
});
