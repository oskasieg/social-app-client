import { IUserFormValues } from './types';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESSED } from './constants';
import { IUserProfile } from '../Profile/types';

export const signUpAction = (data: IUserFormValues) => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const signUpSuccessed = (user: IUserProfile) => ({
  type: SIGN_UP_SUCCESSED,
  user,
});
