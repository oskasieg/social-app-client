import { IProfileReducerAction } from './types';
import { GET_PROFILE_REQUEST } from './contants';
import { SIGN_IN_SUCCESSED } from '../Register/constants';

const initialState = { user: {}, token: {} };

const profileReducer = (state = initialState, action: IProfileReducerAction | any) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSED: {
      return { user: action.user, token: action.token };
    }
    case GET_PROFILE_REQUEST: {
      return state;
    }
    default:
      return state;
  }
};

export default profileReducer;
