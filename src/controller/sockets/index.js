import { ADD_USER, INITIAL_DATA, ADD_MESSAGE, USERS_LIST, ERROR_RECEIVED } from '../../constants/actionsTypes';
import { WSS_END_POINT } from '../../constants/sockets';
import { initialLoad, populateUsersList, messageReceived, userDisconected, userInitializationStart, userInitializationFinish, errorReceived, showDebug, hideDebug } from '../actions';
import { postponeDebugTimers } from '../../utils/debug';

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

    subscribeUser(socket, { type: ADD_USER, name: username });
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
