import { IPost } from '../../containers/Posts/types';

export interface IListPostsProps {
  posts: IPost[];
}

export interface IPostProps {
  post: IPost;
}

export interface IGalleryPopupProps {
  visible: boolean;
  photos: string[];
  handleClose: () => void;
}
