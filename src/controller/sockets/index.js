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
  chatCreated,
  favoriteChatAdded,
  unreadedMessages
} from '../actions';
import websocketsHelpers from './helpers';
import { postponeDebugTimers } from '../../utils/debug';
import normalizeTypingUsers from '../../utils/normalizeTypingUsers';

import { INITIAL_DATA, ADD_MESSAGE, USERS_LIST, ERROR_RECEIVED, SOMEONE_TYPING, NEW_CHAT_CREATED, FAVORITE_CHANNEL_SETTED } from '../../constants/actionsTypes';
import { WSS_END_POINT } from '../../constants/API';

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
        // eslint-disable-next-line no-case-declarations
        const { currentChat } = getState();
        // regular message can be only one per receiving
        // eslint-disable-next-line no-case-declarations
        const currentMessageChat = data.chats[0];
        // looking for the messages in chats rather than current user's.
        // eslint-disable-next-line no-case-declarations
        const isMessageUnreaded = data.layout === 'message' && currentMessageChat.ID !== currentChat.chatID;

        if (isMessageUnreaded) {
          dispatch(unreadedMessages({ chat: currentMessageChat }));
        }

        dispatch(messageReceived(data));
        break;
      case USERS_LIST:
        dispatch(populateUsersList(data.users));
        break;
      case NEW_CHAT_CREATED:
        dispatch(chatCreated(data));
        break;
      case SOMEONE_TYPING:
        delete data.type;
        normalizeTypingUsers(data, getState);
        dispatch(liveTyping(data.typingUsers));
        break;
      case FAVORITE_CHANNEL_SETTED:
        dispatch(favoriteChatAdded(data.favoriteChats));
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
