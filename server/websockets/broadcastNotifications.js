const {
  INITIAL_DATA,
  ADD_MESSAGE,
  USERS_LIST,
  SOMEONE_TYPING
} = require('./constants');

const broadcastNotifications = (WebSocket, wss) => {
  const broadcast = (payload, ws) => {
    wss.clients.forEach(client => {
      if (client.readyState !== WebSocket.OPEN || client === ws) return;

      const notifyPayload = (payload && JSON.stringify(payload)) || null;

      client.send(notifyPayload);
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
    updatedSubscribersMessageList: (payload = {}, ws) => {
      broadcast(
        {
          type: ADD_MESSAGE,
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
