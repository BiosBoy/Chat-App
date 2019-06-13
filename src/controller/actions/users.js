import { ADD_USER, USER_DISCONECTED, USERS_LIST } from '../../constants/actionsTypes';

const addUser = name => ({
  type: ADD_USER,
  name
});

const populateUsersList = users => ({
  type: USERS_LIST,
  users
});

const userDisconected = () => ({
  type: USER_DISCONECTED,
  disconected: true,
  errorType: 'userDisconnected'
});

export { addUser, populateUsersList, userDisconected };
