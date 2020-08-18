import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_MANY_POSTS_REQUEST, ADD_POST_REQUEST, EDIT_POST_REQUEST } from './contants';
import { IGetManyPostsAction, IAddPostAction, IEditPostAction } from './types';
import { getManyPostsSuccessed, editPostSuccessed, getManyPostsAction } from './actions';
import axios from 'axios';
import { getCookie } from '../../lib/cookie';
import { forwardTo } from '../../lib/history';
import { showNotification } from '../../lib/notifications';

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

function* addPost(action: IAddPostAction) {
  const url = 'http://localhost:8000/post';

  try {
    const formData = new FormData();
    formData.append('authorLogin', action.data.authorLogin);
    formData.append('title', action.data.title);
    formData.append('text', action.data.text);
    for (let i = 0; i < action.data.tags.length; i++) {
      formData.append('tags', action.data.tags[i]);
    }
    if (action.data.photos)
      for (let i = 0; i < action.data.photos.length; i++) {
        formData.append('photos', action.data.photos[i]);
      }

    const cookieExist = getCookie();
    if (cookieExist) {
      const cookie = JSON.parse(getCookie() || '');

      const response = yield axios.post(url, formData, {
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${cookie.token}` },
      });

      if (response.status === 200) {
        showNotification('success', 'Success', 'You have added new post!');
        forwardTo('/');
      } else {
        showNotification('danger', 'Error', 'Error while adding new post!');
        forwardTo('/');
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}

function* editPost(action: IEditPostAction) {
  const url = `http://localhost:8000/post/${action.post.title}`;

  try {
    const cookieExist = getCookie();
    if (cookieExist) {
      const cookie = JSON.parse(getCookie() || '');

      const response = yield call(fetch, url, {
        method: 'PUT',
        body: JSON.stringify(action.post),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookie.token}`,
        },
      });

      if (response.status === 200) {
        const json = yield response.json();

        yield put(getManyPostsAction(50));

        if (action.action === 'edit') {
          showNotification('info', 'Information', 'You have edited an post!');
        }
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default function* postsSaga() {
  yield takeEvery(GET_MANY_POSTS_REQUEST, getManyPosts);
  yield takeEvery(ADD_POST_REQUEST, addPost);
  yield takeEvery(EDIT_POST_REQUEST, editPost);
}
