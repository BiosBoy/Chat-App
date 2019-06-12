
const debug = require('debug')('app:build:chat-server');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 80;
const INDEX = path.join(__dirname, 'index.html');
const generateUUID = require('../src/utils/uuid');

const server = express()
  .use(express.static('public'))
  .get('/', (req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new WebSocket.Server({ server });

const users = [];
const messages = [];
const INITIAL_DATA = 'INITIAL_DATA';
const ADD_USER = 'ADD_USER';
const ADD_MESSAGE = 'ADD_MESSAGE';
const REMOVE_USER = 'REMOVE_USER';
const USERS_LIST = 'USERS_LIST';

debug('Chat App Server is Started! Port: ', PORT);

const storeTools = {
  addNewUserToStore: newUser => {
    users.push(newUser);
  },
  addNewMessageToStore: newMessage => {
    messages.push(newMessage);
  },
  deleteDisconnectedUser: userConnectionID => {
    users.splice(0, users.length, ...users.filter(user => user.uuid !== userConnectionID));
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
    updatedSubscribersUserList(users, ws);

    addNewMessageToStore(newMessage);
    updatedSubscribersMessageList(newMessage, ws);

    subscribeNewUser(users, ws);

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
    const { updatedSubscribersUserList, updatedSubscribersMessageList } = broadcastNotificationHandlers;
    const { deleteDisconnectedUser, addNewMessageToStore } = storeTools;

    const leavedUser = users.find(user => user.uuid === userConnectionID);

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

    wss.send(`Disconected user: ${userConnectionID}`);

    notifySubscribersOnLeave(ws, userConnectionID);
  });

  ws.on('error', event => {
    // user is just disconected from its side.
    if (event.code === 'ECONNRESET') return;

    debug('Some error is happen:', event, 'Error Code: ', event.code);
  });
});

// const app = express();

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//   res.setHeader('Cache-Control', 'no-cache');
//   next();
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// })