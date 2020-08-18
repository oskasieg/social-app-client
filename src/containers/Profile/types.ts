import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESEED,
  LOGOUT_PROFILE,
  EDIT_PROFILE_REQUEST,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESSED,
} from './contants';
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESSED } from './contants';
import { IInterest } from '../Register/types';

export interface IUserProfile {
  login: string;
  firstName: string;
  lastName: string;
  age: number;
  interests: string[];
  followers: number;
  avatar: string;
  likes: number;
  numberOfPosts: number;
  createdAt: Date;
  lastLogin: Date;
  password: string;
}

export interface IOtherUserProfile {
  login: string;
  firstName: string;
  lastName: string;
  age: number;
  interests: string[];
  followers: string;
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

export interface IUserProfileProps {
  user: IUserProfile | IOtherUserProfile;
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

export interface IEditProfileAction {
  type: typeof EDIT_PROFILE_REQUEST;
  data: IUserProfile;
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

export interface IGetUserProfileAction {
  type: typeof GET_USER_PROFILE_REQUEST;
  login: string;
}

export interface IGetUserProfileSuccessed {
  type: typeof GET_USER_PROFILE_SUCCESSED;
  user: IOtherUserProfile;
}

export type IProfileReducerAction = IGetProfileAction | ISignInSuccessed | IGetUserProfileSuccessed;
