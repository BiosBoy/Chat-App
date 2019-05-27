import { ADD_MESSAGE, ADD_USER, MESSAGE_RECEIVED, USERS_LIST } from '../constants/actionsTypes';

const nextMessageId = 0;
const nextUserId = 0;

export const addMessage = (message, author) => ({
  type: ADD_MESSAGE,
  id: nextMessageId + 1,
  message,
  author
});

export const addUser = name => ({
  type: ADD_USER,
  id: nextUserId + 1,
  name
});

export const messageReceived = (message, author) => ({
  type: MESSAGE_RECEIVED,
  id: nextMessageId + 1,
  message,
  author
});

export const populateUsersList = users => ({
  type: USERS_LIST,
  users
});
