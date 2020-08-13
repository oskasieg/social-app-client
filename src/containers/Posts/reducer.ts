import { IPostsReducerAction } from './types';
import { GET_MANY_POSTS_SUCCESSED } from './contants';

const initialState = {
  posts: [],
};

const postsReducer = (state = initialState, action: IPostsReducerAction) => {
  switch (action.type) {
    case GET_MANY_POSTS_SUCCESSED: {
      return { ...state, posts: action.posts };
    }
    default:
      return state;
  }
};

export default postsReducer;
