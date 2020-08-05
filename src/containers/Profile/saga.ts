import { takeEvery, call, put } from 'redux-saga/effects';
import { signInSuccessed } from '../Register/actions';
import { ISignInAction } from '../Register/types';
import { SIGN_IN_REQUEST } from '../Register/constants';

function* signIn(action: ISignInAction) {
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

    yield put(signInSuccessed(json.user, json.token));
  } catch (e) {
    throw new Error(e);
  }
}

export default function* profileSaga() {
  yield takeEvery(SIGN_IN_REQUEST, signIn);
}
