import { IProfileReducerAction } from './types';
import { GET_PROFILE_REQUEST, SIGN_IN_SUCCESSED, LOGOUT_PROFILE } from './contants';
import { SIGN_UP_SUCCESSED } from '../Register/constants';

const initialState = { user: {}, isLogged: false };

const profileReducer = (state = initialState, action: IProfileReducerAction | any) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSED: {
      return { user: action.user, isLogged: true };
    }

    case LOGOUT_PROFILE: {
      return initialState;
    }

    case SIGN_UP_SUCCESSED: {
      return { user: action.user, isLogged: true };
    }
    case GET_PROFILE_REQUEST: {
      return state;
    }
    default:
      return state;
  }
};

export default profileReducer;
