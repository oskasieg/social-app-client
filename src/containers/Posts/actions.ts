import { GET_MANY_POSTS_REQUEST, GET_MANY_POSTS_SUCCESSED, ADD_POST_REQUEST, ADD_POST_SUCCESSED, EDIT_POST_REQUEST } from './contants';
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

export const addPostAction = (data: IPostFormValues) => ({
  type: ADD_POST_REQUEST,
  data,
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
