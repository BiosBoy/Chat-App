import { takeEvery, takeLatest } from 'redux-saga/effects';
import { ADD_MESSAGE, USER_TYPING, SOMEONE_TYPING } from '../../constants/actionsTypes';

function sendMessage(socket) {
  return action => socket.send(JSON.stringify(action));
}

function sendTyping(socket) {
  return action => {
    const actionPayload = {
      type: SOMEONE_TYPING,
      name: action.payload.author,
      uuid: action.payload.uuid
    };

    socket.send(JSON.stringify(actionPayload));
  };
}

function* rootSaga(socket) {
  yield takeEvery(ADD_MESSAGE, sendMessage(socket));
  yield takeLatest(USER_TYPING, sendTyping(socket));
}

export default rootSaga;
