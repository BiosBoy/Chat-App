import { ADD_MESSAGE, INITIAL_DATA, ADD_USER, USERS_LIST, MESSAGE_RECEIVED } from '../constants/actionsTypes';

export const initialLoad = ({ users, messages }) => ({
  type: INITIAL_DATA,
  users,
  messages
});

export const addMessage = (message, uuid, uuidAuthor, author) => ({
  type: ADD_MESSAGE,
  uuid,
  message,
  uuidAuthor,
  author
});

export const addUser = name => ({
  type: ADD_USER,
  name
});

export const messageReceived = (message, uuid, author) => ({
  type: MESSAGE_RECEIVED,
  uuid,
  message,
  author
});

export const populateUsersList = users => ({
  type: USERS_LIST,
  users
});
