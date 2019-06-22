const debug = require('debug')('app:chat-server');

const { users, typingUsers, messages, storeTools } = require('./store');
const helpers = require('../utils');

const {
  ADD_USER,
  ADD_MESSAGE,
  REMOVE_USER,
  SOMEONE_TYPING
} = require('./constants');

const eventHandlers = notificationCenter => {
  const { currentUserNotification, broadcastNotificationHandlers } = notificationCenter;
  const { subscribeUser } = currentUserNotification;
  const { checkNameExist: getUserName, generateUUID } = helpers;
  const {
    updatedSubscribersUserList,
    updatedSubscribersMessageList,
    someoneTypingNofity
  } = broadcastNotificationHandlers;
  const {
    userExit,
    addConnectedUser,
    addNewMessageToStore,
    decreaseConnection,
    destroyConnection,
    findCurrentUser,
    updateReconnectedUserData,
    // deleteDisconnectedUser,
    pushTypingUser
  } = storeTools;

  return {
    [ADD_USER]: ({ payload, ws, userConnectionID, cookie }) => {
      const { name = '' } = payload;

      const onConnectionEmmiter = ({ user, message }) => {
        const newMessage = {
          layout: 'newUser',
          message,
          uuid: generateUUID(),
          timestamp: Date.now()
        };

        if (user.connections === 1) {
          addNewMessageToStore(newMessage);
          updatedSubscribersUserList(users, ws);
          updatedSubscribersMessageList(newMessage, ws);
        }

        subscribeUser({ payload: { users, messages }, ws });
      };

      const addNewUser = () => {
        const newUserName = getUserName(users, name);
        const newUserData = { name: newUserName, uuid: userConnectionID, cookie, connections: 1, isConnected: true };

        addConnectedUser(newUserData);
        onConnectionEmmiter({ user: newUserData, message: `${newUserName} is just connected to the chat!` });

        debug('New user is just connected:', { newUserName, cookie });
      };

      const updateReconnectedUser = () => {
        const updatedUser = updateReconnectedUserData({ cookie, newConnectionID: userConnectionID });

        onConnectionEmmiter({ user: updatedUser, message: `${updatedUser.name} is reconnected to the chat!` });

        debug(`${updatedUser.name} user is reconnected to the chat:`, updatedUser);
      };

      if (userExit(cookie)) {
        updateReconnectedUser();

        return;
      }

      addNewUser();
    },
    [ADD_MESSAGE]: ({ payload, ws, userConnectionID }) => {
      const { layout = 'message', message = '', timestamp = null, uuid = null, author = '' } = payload;

      const newMessage = {
        layout,
        message,
        uuid,
        timestamp,
        uuidAuthor: userConnectionID,
        author
      };

      addNewMessageToStore(newMessage);
      updatedSubscribersMessageList(newMessage, ws);

      debug('New message is written:', newMessage);
    },
    [REMOVE_USER]: ({ ws, cookie }) => {
      const leavedUser = findCurrentUser(cookie);

      decreaseConnection(leavedUser);

      if (leavedUser.connections >= 1) {
        return;
      }

      const newMessage = {
        layout: 'newUser',
        message: `${leavedUser.name} was leave the chat!`,
        uuid: generateUUID(),
        timestamp: Date.now()
      };

      // deleteDisconnectedUser(cookie);
      destroyConnection(leavedUser);
      updatedSubscribersUserList(users, ws);

      addNewMessageToStore(newMessage);
      updatedSubscribersMessageList(newMessage, ws);

      debug('Some user is leave the chat:', leavedUser);
    },
    [SOMEONE_TYPING]: ({ spliceRetiredTypingUser, ws, cookie }) => {
      const typingUser = findCurrentUser(cookie);

      // delete user from typingUser store after 3 sec of non-typing phase
      spliceRetiredTypingUser(cookie);

      // prevent if such user is already in
      if (typingUsers.some(user => user.cookie === cookie)) return;

      pushTypingUser(typingUser);
      someoneTypingNofity(typingUsers, ws);

      debug('Someone is Typing now:', typingUser);
    }
  };
};

module.exports = eventHandlers;
