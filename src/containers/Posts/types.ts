import {
  GET_MANY_POSTS_REQUEST,
  GET_MANY_POSTS_SUCCESSED,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESSED,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESSED,
  GET_USERS_POSTS_REQUEST,
  GET_USERS_POSTS_SUCCESSED,
  DELETE_POST_REQUEST,
  GET_POST_BY_NAME_REQUEST,
  GET_POST_BY_NAME_SUCCESSED,
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
  photos: any;
  likes: ILike[];
  sumLikes: number;
  comments: IComment[];
  createdAt: Date;
  editedAt: Date;
  tags: string[];
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

export interface IGetPostByNameAction {
  type: typeof GET_POST_BY_NAME_REQUEST;
  title: string;
}

export interface IGetPostByNameSuccessed {
  type: typeof GET_POST_BY_NAME_SUCCESSED;
  post: IPost;
}

export interface IGetUSersPostsAction {
  type: typeof GET_USERS_POSTS_REQUEST;
  login: string;
}

export interface IGetUsersPostsSuccessed {
  type: typeof GET_USERS_POSTS_SUCCESSED;
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

export interface IDeletePostAction {
  type: typeof DELETE_POST_REQUEST;
  title: string;
  login: string;
}

export type IPostsReducerAction =
  | IGetManyPostsSuccessed
  | IAddPostSuccessed
  | IEditPostSuccessed
  | IGetUsersPostsSuccessed
  | IGetPostByNameSuccessed;
