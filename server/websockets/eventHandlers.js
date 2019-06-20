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
  const { subscribeNewUser } = currentUserNotification;
  const { checkNameExist, generateUUID } = helpers;
  const {
    updatedSubscribersUserList,
    updatedSubscribersMessageList,
    someoneTypingNofity
  } = broadcastNotificationHandlers;
  const {
    addConnectedUser,
    addNewMessageToStore,
    findCurrentUser,
    deleteDisconnectedUser,
    pushTypingUser
  } = storeTools;

  return {
    [ADD_USER]: ({ payload, ws, userConnectionID }) => {
      const { name = '', cookie = '' } = payload;

      const newUserName = checkNameExist(users, name);

      const newUser = {
        name: newUserName,
        uuid: userConnectionID,
        cookie
      };

      const newMessage = {
        layout: 'newUser',
        message: `${newUserName} is just connected to the chat!`,
        uuid: generateUUID(),
        timestamp: Date.now()
      };

      addConnectedUser(newUser);
      updatedSubscribersUserList(users, ws);

      addNewMessageToStore(newMessage);
      updatedSubscribersMessageList(newMessage, ws);

      subscribeNewUser({ payload: { users, messages }, ws });

      debug('New user is just connected:', newUser);
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

      deleteDisconnectedUser(userConnectionID);
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
