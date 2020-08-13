import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_MANY_POSTS_REQUEST } from './contants';
import { IGetManyPostsAction } from './types';
import { getManyPostsSuccessed } from './actions';

function* getManyPosts(action: IGetManyPostsAction) {
  const url = 'http://localhost:8000/post/';

  try {
    const response = yield call(fetch, url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ numberOfPosts: action.number }),
    });

    if (response.status === 200) {
      const json = yield response.json();

      yield put(getManyPostsSuccessed(json));
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default function* postsSaga() {
  yield takeEvery(GET_MANY_POSTS_REQUEST, getManyPosts);
}
