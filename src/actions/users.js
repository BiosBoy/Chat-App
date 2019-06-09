import { ADD_USER, USERS_LIST } from '../constants/actionsTypes';

const addUser = name => ({
  type: ADD_USER,
  name
});

const populateUsersList = users => ({
  type: USERS_LIST,
  users
});

export { addUser, populateUsersList };
