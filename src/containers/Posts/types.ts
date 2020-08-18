import {
  GET_MANY_POSTS_REQUEST,
  GET_MANY_POSTS_SUCCESSED,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESSED,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESSED,
} from './contants';
import { IPostFormValues } from '../../components/PostForm/types';
import { EDIT_PROFILE_SUCCESSED } from '../Profile/contants';

export interface IComment {
  author: string;
  text: string;
  avatar: string;
  createdAt: Date;
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

export interface IAddPostAction {
  type: typeof ADD_POST_REQUEST;
  data: IPostFormValues;
}

export interface IAddPostSuccessed {
  type: typeof ADD_POST_SUCCESSED;
  post: IPost;
}

export interface IEditPostAction {
  type: typeof EDIT_POST_REQUEST;
  post: IPost;
  action: string;
}

export interface IEditPostSuccessed {
  type: typeof EDIT_POST_SUCCESSED;
  post: IPost;
}

export type IPostsReducerAction = IGetManyPostsSuccessed | IAddPostSuccessed | IEditPostSuccessed;
