import {
  GET_MANY_POSTS_REQUEST,
  GET_MANY_POSTS_SUCCESSED,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESSED,
  EDIT_POST_REQUEST,
  GET_USERS_POSTS_REQUEST,
  GET_USERS_POSTS_SUCCESSED,
  DELETE_POST_REQUEST,
  GET_POST_BY_NAME_REQUEST,
  GET_POST_BY_NAME_SUCCESSED,
} from './contants';
import { IPost } from './types';
import { IPostFormValues } from '../../components/PostForm/types';
import { EDIT_PROFILE_SUCCESSED } from '../Profile/contants';

export const getManyPostsAction = (number: number) => ({
  type: GET_MANY_POSTS_REQUEST,
  number,
});

export const getManyPostsSuccessed = (posts: IPost[]) => ({
  type: GET_MANY_POSTS_SUCCESSED,
  posts,
});

export const getPostByNameAction = (title: string) => ({
  type: GET_POST_BY_NAME_REQUEST,
  title,
});

export const getPostByNameSuccessed = (post: IPost) => ({
  type: GET_POST_BY_NAME_SUCCESSED,
  post,
});

export const getUsersPostsAction = (login: string) => ({
  type: GET_USERS_POSTS_REQUEST,
  login,
});

export const getUsersPostsSuccessed = (posts: IPost[]) => ({
  type: GET_USERS_POSTS_SUCCESSED,
  posts,
});

export const addPostAction = (data: IPostFormValues) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const deletePostAction = (login: string, title: string) => ({
  type: DELETE_POST_REQUEST,
  login,
  title,
});

export const addPostSuccessed = (post: IPost) => ({
  type: ADD_POST_SUCCESSED,
  post,
});

export const editPostAction = (post: IPost, action: string) => ({
  type: EDIT_POST_REQUEST,
  post,
  action,
});

export const editPostSuccessed = (post: IPost) => ({
  type: EDIT_PROFILE_SUCCESSED,
  post,
});
