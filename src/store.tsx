import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import profileReducer from './containers/Profile/reducer';
import postsReducer from './containers/Posts/reducer';
import createSagaMiddleware from 'redux-saga';
import registerSaga from './containers/Register/saga';
import profileSaga from './containers/Profile/saga';
import postsSaga from './containers/Posts/saga';
import { all } from 'redux-saga/effects';
import { IUserProfile, IOtherUserProfile } from './containers/Profile/types';
import { IPost } from './containers/Posts/types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface IStoreType {
  profileReducer: {
    user: IUserProfile;
    isLogged: boolean;
    userProfile: IOtherUserProfile;
  };
  postsReducer: {
    posts: IPost[];
    post: IPost;
  };
}

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function* rootSaga() {
  yield all([profileSaga(), registerSaga(), postsSaga()]);
}

const rootReducer = combineReducers({ profileReducer, postsReducer });

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
