import { ADD_MESSAGE, MESSAGE_RECEIVED, SOMEONE_TYPING, USER_TYPING } from '../../constants/actionsTypes';

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

const liveTyping = payload => ({
  type: SOMEONE_TYPING,
  typingUsers: payload
});

const userTyping = payload => ({
  type: USER_TYPING,
  payload
});

export { addMessage, messageReceived, liveTyping, userTyping };
