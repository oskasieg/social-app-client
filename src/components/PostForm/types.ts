import { IPost, ILike, IComment } from '../../containers/Posts/types';

export interface IPostFormValues {
  authorLogin: string;
  title: string;
  text: string;
  photos: any[];
  tags: string[];
  likes: ILike[];
  sumLikes: number;
  comments: IComment[];
  createdAt: Date;
  editedAt: Date;
}

export interface IPostFormProps {
  type?: string;
  post?: IPost;
}
