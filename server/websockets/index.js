const debug = require('debug')('app:websockets');
const WebSocket = require('ws');

const broadcastNotifications = require('./broadcastNotifications');
const sessionDecorators = require('./sessionDecorators');
const eventHandlers = require('./eventHandlers');

const { REMOVE_USER } = require('./constants');
const { PORT } = require('../constants');

const webSocketsServer = expressServerConfiguration => {
  const wss = new WebSocket.Server({ server: expressServerConfiguration });

  const notificationCenter = broadcastNotifications(WebSocket, wss);
  const { broadcastNotificationHandlers } = notificationCenter;

  wss.on('connection', ws => {
    let userCookie = null;

    const {
      userConnectionID,
      spliceRetiredTypingUser
    } = sessionDecorators({ broadcastNotificationHandlers, ws });
    const eventProcessor = eventHandlers(notificationCenter);

    ws.on('message', payload => {
      const { type, ...receivedPayload } = JSON.parse(payload);

      userCookie = receivedPayload.cookie || userCookie;

      if (!Object.hasOwnProperty.call(eventProcessor, type)) return;

      const currentEvent = eventProcessor[type];
      const eventCoreData = {
        ws,
        userConnectionID: userConnectionID(userCookie),
        payload: receivedPayload,
        cookie: userCookie,
        spliceRetiredTypingUser
      };

      currentEvent(eventCoreData);
    });

    ws.on('close', () => {
      const notifySubscribersOnLeave = eventProcessor[REMOVE_USER];

      notifySubscribersOnLeave({ ws, cookie: userCookie });
    });

    ws.on('error', event => {
      // user is just disconected from its side.
      if (event.code === 'ECONNRESET') return;

      debug('Some error is happen:', event, 'Error Code: ', event.code);
    });
  });

  debug('Chat App Server is Started! Port: ', PORT);
};

module.exports = webSocketsServer;
