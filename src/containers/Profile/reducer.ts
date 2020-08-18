import { IProfileReducerAction } from './types';
import { SIGN_IN_SUCCESSED, LOGOUT_PROFILE, GET_USER_PROFILE_SUCCESSED } from './contants';
import { SIGN_UP_SUCCESSED } from '../Register/constants';

const initialState = { user: {}, isLogged: false, userProfile: {} };

const profileReducer = (state = initialState, action: IProfileReducerAction | any) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSED: {
      return { ...state, user: action.user, isLogged: true };
    }

    case LOGOUT_PROFILE: {
      return initialState;
    }

    case SIGN_UP_SUCCESSED: {
      return { ...state, user: action.user, isLogged: true };
    }

    case GET_USER_PROFILE_SUCCESSED: {
      return { ...state, userProfile: action.user };
    }

    default:
      return state;
  }
};

export default profileReducer;
