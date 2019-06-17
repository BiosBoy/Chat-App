import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../controller/reducers';
import setupSocket from '../controller/sockets';
import rootSaga from '../controller/sagas';

import username from '../utils/name';
import logger from '../utils/logger';

import initialState from './initialState';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(sagaMiddleware, logger)
);

const socket = setupSocket(store, username);

sagaMiddleware.run(rootSaga, socket);

export default store;

