import { ADD_MESSAGE, MESSAGE_RECEIVED } from '../constants/actionsTypes';

const addMessage = (messageType, message, uuid, uuidAuthor, author, timestamp) => ({
  type: ADD_MESSAGE,
  messageType,
  uuid,
  message,
  uuidAuthor,
  author,
  timestamp
});

const messageReceived = message => ({
  type: MESSAGE_RECEIVED,
  message
});

export { addMessage, messageReceived };
