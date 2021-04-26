import { IPost } from '../../containers/Posts/types';

export interface IListPostsProps {
  posts: IPost[];
  type: 'edit' | 'default';
}

export interface IPostProps {
  post: IPost;
  type: 'edit' | 'default';
}

export interface IGalleryPopupProps {
  visible: boolean;
  photos: string[];
  handleClose: () => void;
}
