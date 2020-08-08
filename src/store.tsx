import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import profileReducer from './containers/Profile/reducer';
import createSagaMiddleware from 'redux-saga';
import registerSaga from './containers/Register/saga';
import profileSaga from './containers/Profile/saga';
import { all } from 'redux-saga/effects';
import { IUserProfile } from './containers/Profile/types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface IStoreType {
  profileReducer: {
    user: IUserProfile;
    isLogged: boolean;
  };
}

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function* rootSaga() {
  yield all([profileSaga(), registerSaga()]);
}

const rootReducer = combineReducers({ profileReducer });

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
