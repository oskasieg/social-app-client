import { IUserProfile } from '../../containers/Profile/types';
import { IInterest } from '../../containers/Register/types';

export interface IUserFormProps {
  interests: IInterest[];
  type: string;
  user?: IUserProfile;
}
