import { ISignUpAction } from '../Register/types';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SIGN_IN_REQUEST, GET_PROFILE_REQUEST, EDIT_PROFILE_REQUEST, GET_USER_PROFILE_REQUEST } from './contants';
import { signInUpSuccessed, getUserProfileSuccessed } from './actions';
import { setCookie } from '../../lib/cookie';
import { IGetProfileAction, IEditProfileAction, IGetUserProfileAction } from './types';
import { forwardTo } from '../../lib/history';
import { showNotification } from '../../lib/notifications';

function* signIn(action: ISignUpAction) {
  const url = 'https://oskasieg-social-app.herokuapp.com/user/';

  try {
    const response = yield call(fetch, url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(action.data),
    });

    if (response.status === 200) {
      const json = yield response.json();

      setCookie(
        JSON.stringify({
          login: json.user.login,
          token: json.token,
        })
      );

      showNotification('success', 'Success', 'You are logged in!');

      yield call(forwardTo, '/profile');

      yield put(signInUpSuccessed(json.user));
    } else if (response.status === 401) {
      showNotification('danger', 'Error', 'Invalid login!');
    } else if (response.status === 402) {
      showNotification('danger', 'Error', 'Invalid password!');
    }
  } catch (e) {
    throw new Error(e);
  }
}

function* getProfile(action: IGetProfileAction) {
  const url = 'https://oskasieg-social-app.herokuapp.com/user/profile';
  try {
    const response = yield call(fetch, url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${action.token}`,
      },
      body: JSON.stringify({ login: action.login }),
    });

    if (response.status === 200) {
      const json = yield response.json();

      yield put(signInUpSuccessed(json));
    }
  } catch (e) {
    throw new Error(e);
  }
}

function* editProfile(action: IEditProfileAction) {
  const url = 'https://oskasieg-social-app.herokuapp.com/user/profile/edit';

  try {
    const response = yield call(fetch, url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${action.token}`,
      },
      body: JSON.stringify(action.data),
    });

    if (response.status === 200) {
      const json = yield response.json();

      yield put(signInUpSuccessed(json));
    }
    showNotification('info', 'Information', 'You have edited the profile!');
  } catch (e) {
    throw new Error(e);
  }
}

function* getUserProfile(action: IGetUserProfileAction) {
  const url = `https://oskasieg-social-app.herokuapp.com/user/profile/${action.login}`;

  try {
    const response = yield call(fetch, url);

    if (response.status === 200) {
      const json = yield response.json();
      console.log(json);

      yield put(getUserProfileSuccessed(json));
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default function* profileSaga() {
  yield takeEvery(SIGN_IN_REQUEST, signIn);
  yield takeEvery(GET_PROFILE_REQUEST, getProfile);
  yield takeEvery(EDIT_PROFILE_REQUEST, editProfile);
  yield takeEvery(GET_USER_PROFILE_REQUEST, getUserProfile);
}
