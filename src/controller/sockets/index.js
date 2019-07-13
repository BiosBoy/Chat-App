import {
  initialLoad,
  populateUsersList,
  messageReceived,
  userDisconected,
  userInitializationStart,
  userInitializationFinish,
  errorReceived,
  showDebug,
  hideDebug,
  liveTyping,
  chatCreated
} from '../actions';
import websocketsHelpers from './helpers';
import { postponeDebugTimers } from '../../utils/debug';
import normalizeTypingUsers from '../../utils/normalizeTypingUsers';

import { INITIAL_DATA, ADD_MESSAGE, USERS_LIST, ERROR_RECEIVED, SOMEONE_TYPING, NEW_CHAT_CREATED } from '../../constants/actionsTypes';
import { WSS_END_POINT } from '../../constants/sockets';

const setupSocket = ({ getState, dispatch }, username) => {
  const socket = new WebSocket(WSS_END_POINT);
  const { startPostponeTimer, clearPostponeTimer } = postponeDebugTimers(dispatch);

  dispatch(userInitializationStart());
  startPostponeTimer(showDebug, 3000);

  socket.onopen = () => {
    const { subscribeUser } = websocketsHelpers();

    subscribeUser(socket, username);
  };

  socket.onmessage = event => {
    const { dataParser } = websocketsHelpers();

    const data = dataParser(event);

    switch (data.type) {
      case INITIAL_DATA:
        dispatch(initialLoad(data));
        dispatch(userInitializationFinish());
        clearPostponeTimer(hideDebug, getState);
        break;
      case ADD_MESSAGE:
        delete data.type;
        dispatch(messageReceived(data));
        break;
      case USERS_LIST:
        dispatch(populateUsersList(data.users));
        break;
      case NEW_CHAT_CREATED:
        console.log(data, 'data');
        dispatch(chatCreated(data));
        break;
      case SOMEONE_TYPING:
        delete data.type;
        normalizeTypingUsers(data, getState);
        dispatch(liveTyping(data.typingUsers));
        break;
      case ERROR_RECEIVED:
        dispatch(errorReceived(data));
        break;
      default:
        break;
    }
  };

  socket.onclose = () => {
    dispatch(userDisconected());
    dispatch(showDebug());
  };

  return socket;
};

export default setupSocket;
