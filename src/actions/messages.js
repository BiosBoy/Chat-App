import { ADD_MESSAGE, MESSAGE_RECEIVED } from '../constants/actionsTypes';

const addMessage = (message, uuid, uuidAuthor, author, timestamp) => ({
  type: ADD_MESSAGE,
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
