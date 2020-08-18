import { ILoginFormValues, IUserProfile, IOtherUserProfile } from './types';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESSED,
  GET_PROFILE_REQUEST,
  LOGOUT_PROFILE,
  EDIT_PROFILE_REQUEST,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESSED,
} from './contants';

export const signInAction = (data: ILoginFormValues) => ({
  type: SIGN_IN_REQUEST,
  data,
});

export const editProfileAction = (data: any, token: string) => ({
  type: EDIT_PROFILE_REQUEST,
  data,
  token,
});

export const logoutAction = () => ({
  type: LOGOUT_PROFILE,
});

export const getProfileAction = (login: string, token: string) => ({
  type: GET_PROFILE_REQUEST,
  login,
  token,
});

export const signInUpSuccessed = (user: IUserProfile) => ({
  type: SIGN_IN_SUCCESSED,
  user,
});

export const getUserProfileAction = (login: string) => ({
  type: GET_USER_PROFILE_REQUEST,
  login,
});

export const getUserProfileSuccessed = (user: IOtherUserProfile) => ({
  type: GET_USER_PROFILE_SUCCESSED,
  user,
});
