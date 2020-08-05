import { IUserProfile } from '../Profile/types';

export interface IInterest {
  name: string;
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

export interface ISignInAction {
  type: ISignInAction;
  data: IRegisterFormValues;
}

export interface ISignInSuccessed {
  type: ISignInSuccessed;
  user: IUserProfile;
  token: string;
}
