import { ILike } from '../../containers/Posts/types';

export interface ILikesPopupProps {
  likes: ILike[];
  visible: boolean;
  handleClose: () => void;
}
