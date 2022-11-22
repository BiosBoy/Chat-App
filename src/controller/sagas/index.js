import { takeEvery, takeLatest } from 'redux-saga/effects';
import { ADD_MESSAGE, USER_TYPING, SOMEONE_TYPING, CREATE_NEW_CHAT, SET_FAVORITE, USER_INTIALIZATION_FINISH } from '../../constants/actionsTypes';
import getCookie from '../../utils/getCookie';

import checkAuth from './checkAuth';

function sendMessage(socket) {
  return action => socket.send(JSON.stringify(action));
}

function sendFavorite(socket) {
  return action => socket.send(JSON.stringify(action));
}

function sendTyping(socket) {
  return action => {
    const actionPayload = {
      type: SOMEONE_TYPING,
      chat: action.payload.chat,
      name: action.payload.author,
      uuid: action.payload.uuid,
      cookie: getCookie('cookieUUID')
    };

    socket.send(JSON.stringify(actionPayload));
  };
}

function createNewDiretChat(socket) {
  return function* sagahelper(action) {
    const actionPayload = {
      ...action,
      type: CREATE_NEW_CHAT
    };

    yield socket.send(JSON.stringify(actionPayload));
  };
}

function* rootSaga(socket) {
  yield takeEvery(ADD_MESSAGE, sendMessage(socket));
  yield takeLatest(USER_TYPING, sendTyping(socket));
  yield takeLatest(CREATE_NEW_CHAT, createNewDiretChat(socket));
  yield takeLatest(SET_FAVORITE, sendFavorite(socket));
  yield takeLatest(USER_INTIALIZATION_FINISH, checkAuth);
}

export default rootSaga;
