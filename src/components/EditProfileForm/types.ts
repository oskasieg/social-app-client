import { IUserProfile } from '../../containers/Profile/types';
import { IInterest } from '../../containers/Register/types';

export interface IEditProfileFormProps {
  user: IUserProfile;
  interests: IInterest[];
}

export interface IEditProfileFormValues {
  firstName: string;
  lastName: string;
  password: string;
  interests: string[];
  age: number;
  avatar: any;
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
