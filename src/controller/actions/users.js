import {
  ADD_USER,
  USER_DISCONECTED,
  USER_INTIALIZATION_START,
  USER_INTIALIZATION_FINISH,
  NEW_USER_CONNECTED,
  FAVORIVE_CHANNEL_ADDED,
  USER_LOGGED_ID
} from '../../constants/actionsTypes';
import { CONNECTED, IN_PROGRESS, DISCONNECTED } from '../../constants/connectionStatuses';

const addUser = name => ({
  type: ADD_USER,
  name
});

const populateUsersList = users => ({
  type: NEW_USER_CONNECTED,
  users
});

const userInitializationStart = () => ({
  type: USER_INTIALIZATION_START,
  status: IN_PROGRESS,
  errorType: 'userIsNotConnected'
});

const userInitializationFinish = () => ({
  type: USER_INTIALIZATION_FINISH,
  status: CONNECTED,
  errorType: ''
});

const userDisconected = () => ({
  type: USER_DISCONECTED,
  status: DISCONNECTED,
  errorType: 'userDisconnected'
});

const favoriteChatAdded = favoriteChats => ({
  type: FAVORIVE_CHANNEL_ADDED,
  favoriteChats
});

const userLoggedIn = () => ({
  type: USER_LOGGED_ID
});

export {
  addUser,
  populateUsersList,
  userInitializationStart,
  userInitializationFinish,
  userDisconected,
  favoriteChatAdded,
  userLoggedIn
};
