import { IUserProfile } from '../Profile/types';
import { SIGN_UP_SUCCESSED, SIGN_UP_REQUEST } from './constants';

export interface IInterest {
  name: string;
}

export interface IRegisterFormProps {
  interests: IInterest[];
}

export interface IRegisterFormValues {
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  age: number;
  interests: IInterest[];
}

export interface ISignUpAction {
  type: typeof SIGN_UP_REQUEST;
  data: IRegisterFormValues;
}

export interface ISignUpSuccessed {
  type: typeof SIGN_UP_SUCCESSED;
  user: IUserProfile;
  token: string;
}
