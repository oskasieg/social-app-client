import { takeEvery, call, put } from 'redux-saga/effects';
import { signUpSuccessed } from './actions';
import { ISignUpAction } from './types';
import { SIGN_UP_REQUEST } from './constants';

function* signUp(action: ISignUpAction) {
  const url = 'http://localhost:8000/user/register';

  try {
    const response = yield call(fetch, url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(action.data),
    });

    const json = yield response.json();

    yield put(signUpSuccessed(json.user));
  } catch (e) {
    throw new Error(e);
  }
}

export default function* profileSaga() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
