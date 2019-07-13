import { ADD_MESSAGE, MESSAGE_RECEIVED, SOMEONE_TYPING, USER_TYPING } from '../../constants/actionsTypes';

const addMessage = ({ chat, messageType, message, uuid, uuidAuthor, author, timestamp }) => ({
  type: ADD_MESSAGE,
  chat,
  messageType,
  uuid,
  message,
  uuidAuthor,
  author,
  timestamp
});

const messageReceived = ({ chats, ...message }) => ({
  type: MESSAGE_RECEIVED,
  chats,
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
