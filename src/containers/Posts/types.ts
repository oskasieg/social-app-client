import { GET_MANY_POSTS_REQUEST, GET_MANY_POSTS_SUCCESSED } from './contants';

export interface IComment {
  author: string;
  text: string;
  avatar: string;
}

export interface ILike {
  author: string;
  kind: string;
  avatar: string;
}

export interface IPost {
  authorLogin: string;
  title: string;
  text: string;
  photos: string[];
  likes: ILike[];
  sumLikes: number;
  comments: IComment[];
  createdAt: Date;
  editedAt: Date;
}

// REDUX

export interface IGetManyPostsAction {
  type: typeof GET_MANY_POSTS_REQUEST;
  number: number;
}

export interface IGetManyPostsSuccessed {
  type: typeof GET_MANY_POSTS_SUCCESSED;
  posts: IPost[];
}

export type IPostsReducerAction = IGetManyPostsSuccessed;
