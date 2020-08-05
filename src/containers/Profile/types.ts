import { GET_PROFILE_REQUEST } from './contants';
import { IInterest, ISignInSuccessed } from '../../containers/Register/types';

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

export interface IGetProfileAction {
  type: typeof GET_PROFILE_REQUEST;
}

export type IProfileReducerAction = IGetProfileAction | ISignInSuccessed;
