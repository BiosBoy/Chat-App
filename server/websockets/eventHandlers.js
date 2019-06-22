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
    findCurrentUser,
    updateUserUUID,
    // deleteDisconnectedUser,
    pushTypingUser
  } = storeTools;

  return {
    [ADD_USER]: ({ payload, ws, userConnectionID }) => {
      const { name = '', cookie = '' } = payload;

      const onConnectionEmmiter = message => {
        const newMessage = {
          layout: 'newUser',
          message,
          uuid: generateUUID(),
          timestamp: Date.now()
        };

        addNewMessageToStore(newMessage);
        updatedSubscribersUserList(users, ws);
        updatedSubscribersMessageList(newMessage, ws);

        subscribeUser({ payload: { users, messages }, ws });
      };

      const addNewUser = () => {
        const newUserName = getUserName(users, name);

        addConnectedUser({ name: newUserName, uuid: userConnectionID, cookie });
        onConnectionEmmiter(`${newUserName} is just connected to the chat!`);

        debug('New user is just connected:', { newUserName, cookie });
      };

      const updateReconnectedUser = () => {
        const updatedUser = updateUserUUID({ cookie, newConnectionID: userConnectionID });

        onConnectionEmmiter(`${updatedUser.name} is reconnected to the chat!`);

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
    [REMOVE_USER]: ({ ws, userConnectionID }) => {
      const leavedUser = findCurrentUser(userConnectionID);

      const newMessage = {
        layout: 'newUser',
        message: `${leavedUser.name} was leave the chat!`,
        uuid: generateUUID(),
        timestamp: Date.now()
      };

      // deleteDisconnectedUser(userConnectionID);
      updatedSubscribersUserList(users, ws);

      addNewMessageToStore(newMessage);
      updatedSubscribersMessageList(newMessage, ws);

      debug('Some user is leave the chat:', leavedUser);
    },
    [SOMEONE_TYPING]: ({ spliceRetiredTypingUser, ws, userConnectionID }) => {
      const typingUser = findCurrentUser(userConnectionID);

      // delete user from typingUser store after 3 sec of non-typing phase
      spliceRetiredTypingUser();

      if (typingUsers.some(user => user.uuid === userConnectionID)) return;

      pushTypingUser(typingUser);
      someoneTypingNofity(typingUsers, ws);

      debug('Someone is Typing now:', userConnectionID, typingUser);
    }
  };
};

module.exports = eventHandlers;
