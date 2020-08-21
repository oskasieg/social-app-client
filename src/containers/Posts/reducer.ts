import { IPostsReducerAction, IPost } from './types';
import {
  GET_MANY_POSTS_SUCCESSED,
  ADD_POST_SUCCESSED,
  EDIT_POST_SUCCESSED,
  GET_USERS_POSTS_SUCCESSED,
  GET_POST_BY_NAME_SUCCESSED,
} from './contants';

const initialState = {
  posts: [],
  post: {},
};

const postsReducer = (state = initialState, action: IPostsReducerAction) => {
  switch (action.type) {
    case GET_MANY_POSTS_SUCCESSED: {
      return { ...state, posts: action.posts };
    }

    case GET_POST_BY_NAME_SUCCESSED: {
      return { ...state, post: action.post };
    }

    case GET_USERS_POSTS_SUCCESSED: {
      return { ...state, posts: action.posts };
    }

    case ADD_POST_SUCCESSED: {
      return { ...state, posts: [...state.posts, action.post] };
    }

    case EDIT_POST_SUCCESSED: {
      let newState: IPost[] = [];
      state.posts.forEach((post: IPost) => {
        if (post.title === action.post.title) {
          newState.push(action.post);
        } else {
          newState.push(post);
        }
      });
      return { ...state, posts: newState };
    }

    default:
      return state;
  }
};

export default postsReducer;
