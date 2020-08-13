import { GET_MANY_POSTS_REQUEST, GET_MANY_POSTS_SUCCESSED } from './contants';
import { IPost } from './types';

export const getManyPostsAction = (number: number) => ({
  type: GET_MANY_POSTS_REQUEST,
  number,
});

export const getManyPostsSuccessed = (posts: IPost[]) => ({
  type: GET_MANY_POSTS_SUCCESSED,
  posts,
});
