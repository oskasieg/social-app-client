import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_MANY_POSTS_REQUEST,
  ADD_POST_REQUEST,
  EDIT_POST_REQUEST,
  GET_USERS_POSTS_REQUEST,
  DELETE_POST_REQUEST,
  GET_POST_BY_NAME_REQUEST,
} from './contants';
import {
  IGetManyPostsAction,
  IAddPostAction,
  IEditPostAction,
  IGetUSersPostsAction,
  IDeletePostAction,
  IGetPostByNameAction,
} from './types';
import { getManyPostsSuccessed, getManyPostsAction, getUsersPostsSuccessed, getUsersPostsAction, getPostByNameSuccessed } from './actions';
import axios from 'axios';
import { getCookie } from '../../lib/cookie';
import { forwardTo } from '../../lib/history';
import { showNotification } from '../../lib/notifications';

function* getManyPosts(action: IGetManyPostsAction) {
  const url = 'https://oskasieg-social-app.herokuapp.com/post/';

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

function* getPostByName(action: IGetPostByNameAction) {
  const url = `https://oskasieg-social-app.herokuapp.com/post/${action.title}`;

  try {
    const response = yield call(fetch, url);

    if (response.status === 200) {
      const json = yield response.json();

      yield put(getPostByNameSuccessed(json));
    }
  } catch (e) {
    throw new Error(e);
  }
}

function* getUsersPosts(action: IGetUSersPostsAction) {
  const url = `https://oskasieg-social-app.herokuapp.com/post/user/${action.login}`;

  try {
    const cookieExist = getCookie();
    if (cookieExist) {
      const cookie = JSON.parse(getCookie() || '');
      const response = yield call(fetch, url, {
        method: 'GET',
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${cookie.token}` },
      });

      if (response.status === 200) {
        const json = yield response.json();

        yield put(getUsersPostsSuccessed(json));
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}

function* addPost(action: IAddPostAction) {
  const url = 'https://oskasieg-social-app.herokuapp.com/post';

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
  const url = `https://oskasieg-social-app.herokuapp.com/post/${action.post.title}`;

  try {
    if (action.action === 'edit') {
      const formData = new FormData();
      formData.append('authorLogin', action.post.authorLogin);
      formData.append('title', action.post.title);
      formData.append('text', action.post.text);
      for (let i = 0; i < action.post.tags.length; i++) {
        formData.append('tags', action.post.tags[i]);
      }
      for (let i = 0; i < action.post.photos.length; i++) {
        formData.append('photos', action.post.photos[i]);
      }
      const cookieExist = getCookie();
      if (cookieExist) {
        const cookie = JSON.parse(getCookie() || '');

        const response = yield axios.put(url, formData, {
          headers: { 'Content-type': 'application/json', Authorization: `Bearer ${cookie.token}` },
        });
        if (response.status === 200) {
          yield put(getUsersPostsAction(action.post.authorLogin));

          showNotification('info', 'Information', 'You have edited an post!');
          forwardTo('/posts');
        }
      }
    } else {
      const cookieExist = getCookie();
      if (cookieExist) {
        const cookie = JSON.parse(getCookie() || '');

        const response = yield call(fetch, url, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json', Authorization: `Bearer ${cookie.token}` },
          body: JSON.stringify(action.post),
        });

        if (response.status === 200) {
          yield put(getManyPostsAction(50));
        }
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}

function* deletePost(action: IDeletePostAction) {
  const url = `https://oskasieg-social-app.herokuapp.com/post/${action.title}`;

  try {
    const cookieExist = getCookie();
    if (cookieExist) {
      const cookie = JSON.parse(getCookie() || '');

      const response = yield call(fetch, url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookie.token}`,
        },
      });

      if (response.status === 200) {
        yield put(getUsersPostsAction(action.login));
        showNotification('success', 'Success', 'You have deleted a post!');
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default function* postsSaga() {
  yield takeEvery(GET_MANY_POSTS_REQUEST, getManyPosts);
  yield takeEvery(GET_POST_BY_NAME_REQUEST, getPostByName);
  yield takeEvery(GET_USERS_POSTS_REQUEST, getUsersPosts);
  yield takeEvery(ADD_POST_REQUEST, addPost);
  yield takeEvery(EDIT_POST_REQUEST, editPost);
  yield takeEvery(DELETE_POST_REQUEST, deletePost);
}
