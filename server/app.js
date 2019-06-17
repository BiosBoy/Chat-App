
const debug = require('debug')('app:build:chat-server');
const WebSocket = require('ws');
const port = 80 || process.env.PORT;
const wss = new WebSocket.Server({ port });

const generateUUID = require('../src/utils/uuid');

const users = [];
const messages = [];
const typingUsers = [];

const INITIAL_DATA = 'INITIAL_DATA';
const ADD_USER = 'ADD_USER';
const ADD_MESSAGE = 'ADD_MESSAGE';
const REMOVE_USER = 'REMOVE_USER';
const USERS_LIST = 'USERS_LIST';
const SOMEONE_TYPING = 'SOMEONE_TYPING';

debug('Chat App Server is Started! Port: ', process.env.PORT || 80);

const storeTools = {
  addConnectedUser: newUser => {
    users.push(newUser);
  },
  deleteDisconnectedUser: userConnectionID => {
    users.splice(0, users.length, ...users.filter(user => user.uuid !== userConnectionID));
  },
  findCurrentUser: userConnectionID => users.find(user => user.uuid === userConnectionID),
  addNewMessageToStore: newMessage => {
    messages.push(newMessage);
  },
  pushTypingUser: newUser => {
    if (typingUsers.some(user => user.uuid === newUser.uuid)) return;

    typingUsers.push(newUser);
  },
  removeTypingUser: userConnectionID => {
    typingUsers.splice(0, typingUsers.length, ...typingUsers.filter(user => user.uuid !== userConnectionID));
  }
};

const helpers = {
  setConnectedUserID: () => generateUUID(),
  debounce(functions, params) {
    let timer = null;
    const { common: { delay } } = params;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        functions.forEach((func, index) => func.call(this, ...params[index]));

        timer = null;
      }, delay);
    };
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

const currentConnectedUser = {
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
  [ADD_USER]: ({ payload, ws, userConnectionID }) => {
    const { name = '' } = payload;
    const { updatedSubscribersUserList, updatedSubscribersMessageList } = broadcastNotificationHandlers;
    const { subscribeNewUser } = currentConnectedUser;
    const { addConnectedUser, addNewMessageToStore } = storeTools;

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

    addConnectedUser(newUser);
    updatedSubscribersUserList(users, ws);

    addNewMessageToStore(newMessage);
    updatedSubscribersMessageList(newMessage, ws);

    subscribeNewUser(users, ws);

    debug('New user is just connected:', newUser);
  },
  [ADD_MESSAGE]: ({ payload, ws, userConnectionID }) => {
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

    debug('New message is written:', newMessage);
  },
  [REMOVE_USER]: ({ ws, userConnectionID }) => {
    const { updatedSubscribersUserList, updatedSubscribersMessageList } = broadcastNotificationHandlers;
    const { deleteDisconnectedUser, addNewMessageToStore, findCurrentUser } = storeTools;

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
  [SOMEONE_TYPING]: ({ spliceTypingUser, ws, userConnectionID }) => {
    const { someoneTypingNofity } = broadcastNotificationHandlers;
    const { findCurrentUser, pushTypingUser } = storeTools;

    const typingUser = findCurrentUser(userConnectionID);

    // delete user from typingUser store after 3 sec of non-typing phase
    spliceTypingUser();

    if (typingUsers.some(user => user.uuid === userConnectionID)) return;

    pushTypingUser(typingUser);
    someoneTypingNofity(typingUsers, ws);

    debug('Someone is Typing now:', userConnectionID, typingUser);
  }
};

const core = ws => {
  const { setConnectedUserID, debounce } = helpers;
  const { someoneTypingNofity } = broadcastNotificationHandlers;
  const { removeTypingUser } = storeTools;

  const userConnectionID = setConnectedUserID();

  const typingUserDebounce = () => {
    const invokeFunctions = [removeTypingUser, someoneTypingNofity];
    const params = {
      0: [userConnectionID],
      1: [typingUsers, ws],
      common: {
        delay: 1000
      }
    };

    return debounce(invokeFunctions, params);
  };

  return {
    userConnectionID,
    typingUserDebounce
  };
};

wss.on('connection', ws => {
  const { userConnectionID, typingUserDebounce } = core();
  const spliceTypingUser = typingUserDebounce();

  ws.on('message', payload => {
    const { type, ...receivedPayload } = JSON.parse(payload);

    if (!Object.hasOwnProperty.call(eventsHanlders, type)) return;

    const currentEvent = eventsHanlders[type];

    currentEvent({ spliceTypingUser, payload: receivedPayload, ws, userConnectionID });
  });

  ws.on('close', () => {
    const notifySubscribersOnLeave = eventsHanlders[REMOVE_USER];

    notifySubscribersOnLeave({ ws, userConnectionID });
  });

  ws.on('error', event => {
    // user is just disconected from its side.
    if (event.code === 'ECONNRESET') return;

    debug('Some error is happen:', event, 'Error Code: ', event.code);
  });
});
