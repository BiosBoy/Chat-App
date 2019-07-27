const {
  INITIAL_DATA,
  ADD_MESSAGE,
  USERS_LIST,
  SOMEONE_TYPING,
  NEW_CHAT_CREATED,
  FAVORITE_CHANNEL_SETTED
} = require('./constants');

const broadcastNotifications = (WebSocket, wss) => {
  const startEmmiting = (client, payload, allowedClients) => {
    const notifyPayload = (payload && JSON.stringify(payload)) || null;
    const emitParticularClients = allowedClients.length > 0;

    if (emitParticularClients && !allowedClients.includes(client.ID)) {
      return;
    }

    client.send(notifyPayload);
  };

  const broadcast = (payload = {}, ws, allowOrigin = false, allowedClients = []) => {
    wss.clients.forEach(client => {
      const isClientNotReady = client.readyState !== WebSocket.OPEN;
      const isOriginRestricted = !allowOrigin && client === ws;

      if (isClientNotReady || isOriginRestricted) {
        return;
      }

      startEmmiting(client, payload, allowedClients);
    });
  };

  const broadcastNotificationHandlers = {
    updatedSubscribersUserList: (userList = [], ws) => {
      broadcast(
        {
          type: USERS_LIST,
          users: userList
        },
        ws
      );
    },
    updatedSubscribersMessageList: (chats, payload = {}, ws) => {
      broadcast(
        {
          type: ADD_MESSAGE,
          chats,
          ...payload
        },
        ws
      );
    },
    someoneTypingNofity: (payload = [], ws) => {
      broadcast(
        {
          type: SOMEONE_TYPING,
          typingUsers: payload
        },
        ws
      );
    },
    newChatCreatedNofity: (payload = {}, ws) => {
      broadcast(
        {
          type: NEW_CHAT_CREATED,
          newChat: payload
        },
        ws,
        true,
        payload.allowedUsers
      );
    },
    notifyUserAboutFavoriteAdded: (payload = {}, ws) => {
      broadcast(
        {
          type: FAVORITE_CHANNEL_SETTED,
          favoriteChats: payload
        },
        ws,
        true,
        payload.allowedUsers
      );
    }
  };

  const currentUserNotification = {
    subscribeUser: ({ payload = {}, ws }) => {
      ws.send(
        JSON.stringify({
          type: INITIAL_DATA,
          ...payload
        })
      );
    }
  };

  return {
    broadcastNotificationHandlers,
    currentUserNotification
  };
};

module.exports = broadcastNotifications;
