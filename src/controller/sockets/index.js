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
  liveTyping
} from '../actions';
import { postponeDebugTimers } from '../../utils/debug';
import getCookie from '../../utils/getCookie';

import { ADD_USER, INITIAL_DATA, ADD_MESSAGE, USERS_LIST, ERROR_RECEIVED, SOMEONE_TYPING } from '../../constants/actionsTypes';
import { WSS_END_POINT } from '../../constants/sockets';

const websocketsHelpers = () => ({
  subscribeUser: (socket, payload) => socket.send(JSON.stringify(payload)),
  dataParser: event => JSON.parse(event.data)
});

const setupSocket = ({ getState, dispatch }, username) => {
  const socket = new WebSocket(WSS_END_POINT);
  const { startPostponeTimer, clearPostponeTimer } = postponeDebugTimers(dispatch);

  dispatch(userInitializationStart());
  startPostponeTimer(showDebug, 3000);

  socket.onopen = () => {
    const { subscribeUser } = websocketsHelpers();

    subscribeUser(socket, { type: ADD_USER, name: username, cookie: getCookie('cookieUUID') });
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
      case SOMEONE_TYPING:
        delete data.type;

        if (data.typingUsers.some(user => user.uuid === getState().currentUser.uuid)) {
          data.typingUsers.splice(
            0,
            data.typingUsers.length,
            ...data.typingUsers.filter(user => user.uuid !== getState().currentUser.uuid)
          );
        }

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
