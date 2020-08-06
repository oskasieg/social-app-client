import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESEED, LOGOUT_PROFILE } from './contants';
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESSED } from './contants';
import { IInterest } from '../Register/types';

export interface IUserProfile {
  login: string;
  firstName: string;
  lastName: string;
  age: number;
  interests: IInterest[];
  followers: number;
  avatar: string;
  likes: number;
  numberOfPosts: number;
  createdAt: Date;
  lastLogin: Date;
}

export interface ILoginFormValues {
  login: string;
  password: string;
}

// REDUX

export interface ISignInAction {
  type: typeof SIGN_IN_REQUEST;
  data: ILoginFormValues;
}

export interface ISignInSuccessed {
  type: typeof SIGN_IN_SUCCESSED;
  user: IUserProfile;
  token: string;
}

export interface ILogoutAction {
  type: typeof LOGOUT_PROFILE;
}

export interface IGetProfileAction {
  type: typeof GET_PROFILE_REQUEST;
  login: string;
  token: string;
}

export interface IGetProfileSuccessed {
  type: typeof GET_PROFILE_SUCCESEED;
  user: IUserProfile;
}

export type IProfileReducerAction = IGetProfileAction | ISignInSuccessed;
