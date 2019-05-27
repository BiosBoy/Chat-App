const WebSocket = require('ws');
const port = 8989 || process.env.PORT;
const wss = new WebSocket.Server({ port });

const users = [];
const ADD_USER = 'ADD_USER';
const ADD_MESSAGE = 'ADD_MESSAGE';
const REMOVE_USER = 'REMOVE_USER';
const USERS_LIST = 'USERS_LIST';

const storeTools = {
  addNewUserToStore: newUser => {
    users.push(newUser);
  },
  deleteDisconnectedUser: userConnectionID => {
    users.splice(0, users.length, ...users.filter(user => user.uuid !== userConnectionID));
  }
};

const helpers = {
  setConnectedUserID: () => {
    const connectedUserID = Date.now() + Math.floor(Math.random() * (1000 - 1) + 1);

    return connectedUserID;
  }
};

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
  updatedMessagesList: (payload = {}, ws) => {
    broadcast(
      {
        type: ADD_MESSAGE,
        ...payload
      },
      ws
    );
  }
};

const webSocketEventsHandlers = {
  subscribeNewUser: (usersList = [], ws) => {
    ws.send(
      JSON.stringify({
        type: USERS_LIST,
        users: usersList
      })
    );
  }
};

const eventsHanlders = {
  [ADD_USER]: (payload, ws, userConnectionID) => {
    const { name = '' } = payload;
    const { updatedSubscribersUserList } = broadcastNotificationHandlers;
    const { subscribeNewUser } = webSocketEventsHandlers;
    const { addNewUserToStore } = storeTools;

    const newUser = {
      name,
      id: users.length + 1,
      uuid: userConnectionID
    };

    addNewUserToStore(newUser);
    subscribeNewUser(users, ws);
    updatedSubscribersUserList(users, ws);
  },
  [ADD_MESSAGE]: (payload, ws) => {
    const { updatedMessagesList } = broadcastNotificationHandlers;
    const { message = '', author = '' } = payload;

    updatedMessagesList({ message, author }, ws);
  },
  [REMOVE_USER]: (ws, userConnectionID) => {
    const { updatedSubscribersUserList } = broadcastNotificationHandlers;
    const { deleteDisconnectedUser } = storeTools;

    deleteDisconnectedUser(userConnectionID);
    updatedSubscribersUserList(users, ws);
  }
};

wss.on('connection', ws => {
  const { setConnectedUserID } = helpers;
  const userConnectionID = setConnectedUserID();

  ws.on('message', payload => {
    const { type, ...receivedPayload } = JSON.parse(payload);

    if (!Object.hasOwnProperty.call(eventsHanlders, type)) return;

    const currentEvent = eventsHanlders[type];

    currentEvent(receivedPayload, ws, userConnectionID);
  });

  ws.on('close', () => {
    const notifySubscribersOnLeave = eventsHanlders[REMOVE_USER];

    notifySubscribersOnLeave(ws, userConnectionID);
  });
});
