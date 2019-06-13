import { takeEvery } from 'redux-saga/effects';
import { ADD_MESSAGE } from '../../constants/actionsTypes';

function sendMessage(params) {
  const { socket, username } = params;

  return function helper(action) {
    const actionPayloadToServer = {
      ...action,
      author: username
    };

    socket.send(JSON.stringify(actionPayloadToServer));
  };
}

function* handleNewMessage(params) {
  yield takeEvery(ADD_MESSAGE, sendMessage(params));
}

export default handleNewMessage;
