import { createStore, compose, applyMiddleware } from 'redux';
import profileReducer from './containers/Profile/reducer';
import createSagaMiddleware from 'redux-saga';
import profileSaga from './containers/Profile/saga';
import { all } from 'redux-saga/effects';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function* rootSaga() {
  yield all([profileSaga()]);
}

const rootReducer = profileReducer;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
