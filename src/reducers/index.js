import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import currentUser from './currentUser';

const chat = combineReducers({
  currentUser,
  messages,
  users
});

export default chat;

