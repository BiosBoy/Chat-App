const debug = require('debug')('app:chat-server');

const { store, storeTools } = require('./store');
const helpers = require('../utils');

const {
  ADD_USER,
  ADD_MESSAGE,
  REMOVE_USER,
  SOMEONE_TYPING,
  CREATE_NEW_CHAT
} = require('./constants');

const eventHandlers = notificationCenter => {
  const { currentUserNotification, broadcastNotificationHandlers } = notificationCenter;
  const { subscribeUser } = currentUserNotification;
  const { checkNameExist: getUserName, newMessage: generateNewMessage } = helpers;
  const {
    updatedSubscribersUserList,
    updatedSubscribersMessageList,
    newChatCreatedNofity,
    someoneTypingNofity
  } = broadcastNotificationHandlers;
  const {
    userAlredyExist,
    addConnectedUser,
    addUserConnectionStatusMessageToChats,
    addNewMessageToChat,
    decreaseConnection,
    destroyConnection,
    findCurrentUser,
    updateReconnectedUserData,
    pushTypingUser,
    createNewChat
  } = storeTools;

  return {
    [ADD_USER]: ({ payload, ws, userConnectionID, cookie }) => {
      const { name = '' } = payload;

      const onConnectionEmmiter = ({ user, message }) => {
        if (user.connections === 1) {
          addUserConnectionStatusMessageToChats(user.uuid, message);
          updatedSubscribersUserList(store.users, ws);

          const chatsToInsertMessage = [];

          Object.keys(store.chats).forEach(chat => {
            store.chats[chat].forEach(channel => {
              channel.allowedUsers.includes(user.uuid) && chatsToInsertMessage.push({ type: chat, ID: channel.ID });
            });
          });

          updatedSubscribersMessageList(chatsToInsertMessage, message, ws);
        }

        subscribeUser({ payload: store, ws });
      };

      const addNewUser = () => {
        const newUserName = getUserName(store.users, name);
        const newUserData = {
          name: newUserName,
          uuid: userConnectionID,
          cookie,
          connections: 1,
          isConnected: true
        };

        addConnectedUser(newUserData);
        createNewChat({ type: 'direct', ID: `${userConnectionID + userConnectionID}`, allowedUsers: [userConnectionID], messages: [generateNewMessage({ type: 'user', message: `Hi, ${newUserName}! This is your personal chat! You can store here any what you want! :)` })] });

        onConnectionEmmiter({ user: newUserData, message: generateNewMessage({ type: 'user', message: `${newUserName} is just connected to the chat!` }) });
        debug('New user is just connected:', { name: newUserName, cookie });
      };

      const updateReconnectedUser = () => {
        const updatedUser = updateReconnectedUserData({ cookie });

        onConnectionEmmiter({ user: updatedUser, message: generateNewMessage({ type: 'user', message: `${updatedUser.name} is reconnected to the chat!` }) });

        debug(`${updatedUser.name} user is reconnected to the chat:`, updatedUser);
      };

      if (userAlredyExist(cookie)) {
        updateReconnectedUser();

        return;
      }

      addNewUser();
    },
    [ADD_MESSAGE]: ({ payload, ws, userConnectionID }) => {
      const { chat, layout = 'message', message = '', timestamp = null, uuid = null, author = '' } = payload;

      const newUserMessage = {
        ...generateNewMessage({ type: layout, message, uuid, timestamp }),
        author,
        uuidAuthor: userConnectionID
      };

      addNewMessageToChat(chat, newUserMessage);
      updatedSubscribersMessageList([chat], newUserMessage, ws);

      debug('New message is written:', newUserMessage);
    },
    [REMOVE_USER]: ({ ws, cookie }) => {
      const leavedUser = findCurrentUser(cookie);
      const isUserStillConnectedFromAnotherTab = leavedUser.connections >= 1;

      decreaseConnection(leavedUser);

      if (isUserStillConnectedFromAnotherTab) {
        return;
      }

      const newMessage = generateNewMessage({ type: 'user', message: `${leavedUser.name} was leave the chat!` });

      // deleteDisconnectedUser(cookie);
      destroyConnection(leavedUser);
      updatedSubscribersUserList(store.users, ws);

      const chatsToInsertMessage = [];

      Object.keys(store.chats).forEach(chat => {
        store.chats[chat].forEach(channel => {
          channel.allowedUsers.includes(leavedUser.uuid) && chatsToInsertMessage.push({ type: chat, ID: channel.ID });
        });
      });

      addUserConnectionStatusMessageToChats(newMessage);
      updatedSubscribersMessageList(chatsToInsertMessage, newMessage, ws);

      debug('Some user is leave the chat:', leavedUser);
    },
    [SOMEONE_TYPING]: ({ payload, spliceRetiredTypingUser, ws }) => {
      // const typingUser = findCurrentUser(cookie);

      // delete user from typingUser store after 3 sec of non-typing phase
      spliceRetiredTypingUser(payload.cookie);

      // prevent if such user is already in
      if (store.typingUsers.some(user => user.cookie === payload.cookie)) return;

      pushTypingUser(payload);
      someoneTypingNofity(store.typingUsers, ws);

      debug('Someone is Typing now:', payload.name);
    },
    [CREATE_NEW_CHAT]: ({ payload: { payload } }) => {
      if (store.chats[payload.chatType].some(channel => channel.ID === payload.ID)) {
        debug('Chat is already created! Revert.');

        return;
      }

      const currentUser = store.users.find(user => user.uuid === payload.currentUserID);
      const userToChat = store.users.find(user => user.uuid === payload.uuid);
      const newChatData = {
        type: payload.chatType,
        ID: payload.chatID,
        allowedUsers: payload.allowedUsers,
        messages: [
          generateNewMessage({
            type: 'user',
            message: `Hi, ${currentUser.name}! This is the very beginning chat history with ${userToChat.name}! :)`
          })
        ]
      };

      createNewChat(newChatData);
      newChatCreatedNofity(newChatData);
      debug('New Chat has been created:', currentUser.name, userToChat.name);
    }
  };
};

module.exports = eventHandlers;
