// index.js
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { statusReducer } from './reducer';
import { watchToggleStatus } from './sagas';

const rootReducer = combineReducers(
    console.log("going");{
  status: statusReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(function* () {
  yield all([
    watchToggleStatus()
  ]);
});
