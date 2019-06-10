
const debug = require('debug')('app:build:chat-server');
const WebSocket = require('ws');
const port = 8989 || process.env.PORT;
const wss = new WebSocket.Server({ port });

const generateUUID = require('../src/utils/uuid');

const users = [];
const messages = [];
const INITIAL_DATA = 'INITIAL_DATA';
const ADD_USER = 'ADD_USER';
const ADD_MESSAGE = 'ADD_MESSAGE';
const REMOVE_USER = 'REMOVE_USER';
const USERS_LIST = 'USERS_LIST';

debug('Chat App Server is Started!');

const storeTools = {
  addNewUserToStore: newUser => {
    users.push(newUser);
  },
  deleteDisconnectedUser: userConnectionID => {
    users.splice(0, users.length, ...users.filter(user => user.uuid !== userConnectionID));
  },
  addNewMessageToStore: newMessage => {
    messages.push(newMessage);
  }
};

const helpers = {
  setConnectedUserID: () => generateUUID()
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
  updatedSubscribersMessageList: (payload = {}, ws) => {
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
        type: INITIAL_DATA,
        users: usersList,
        messages
      })
    );
  }
};

const eventsHanlders = {
  [ADD_USER]: (payload, ws, userConnectionID) => {
    const { name = '' } = payload;
    const { updatedSubscribersUserList, updatedSubscribersMessageList } = broadcastNotificationHandlers;
    const { subscribeNewUser } = webSocketEventsHandlers;
    const { addNewUserToStore, addNewMessageToStore } = storeTools;

    const newUser = {
      name,
      uuid: userConnectionID
    };

    const newMessage = {
      layout: 'newUser',
      message: `${name} is just connected to the chat!`,
      uuid: generateUUID(),
      timestamp: Date.now()
    };

    addNewUserToStore(newUser);
    addNewMessageToStore(newMessage);
    subscribeNewUser(users, ws);

    updatedSubscribersUserList(users, ws);
    updatedSubscribersMessageList(newMessage, ws);
    debug('New user is just connected:', newUser);
  },
  [ADD_MESSAGE]: (payload, ws, userConnectionID) => {
    const { layout = 'message', message = '', timestamp = null, uuid = null, author = '' } = payload;
    const { updatedSubscribersMessageList } = broadcastNotificationHandlers;
    const { addNewMessageToStore } = storeTools;

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
    debug('New message is written:', newMessage, messages);
  },
  [REMOVE_USER]: (ws, userConnectionID) => {
    const { updatedSubscribersUserList } = broadcastNotificationHandlers;
    const { deleteDisconnectedUser } = storeTools;

    deleteDisconnectedUser(userConnectionID);
    updatedSubscribersUserList(users, ws);
    debug('Some user leave:', users.find(user => user.uuid === userConnectionID));
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
