import { takeEvery, call, put } from 'redux-saga/effects';
import { signUpSuccessed } from './actions';
import { ISignUpAction } from './types';
import { SIGN_UP_REQUEST } from './constants';
import { forwardTo } from '../../lib/history';
import { setCookie } from '../../lib/cookie';
import { showNotification } from '../../lib/notifications';

function* signUp(action: ISignUpAction) {
  const url = 'https://oskasieg-social-app.herokuapp.com/user/register';

  try {
    const response = yield call(fetch, url, {
      method: 'POST',
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

      showNotification('success', 'Success', 'You have created an account!');

      yield call(forwardTo, '/');

      yield put(signUpSuccessed(json.user));
    } else {
      showNotification('danger', 'Error', 'User with that login exist!');
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default function* profileSaga() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
