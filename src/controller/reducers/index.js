import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import currentUser from './currentUser';
import debug from './debug';

const chat = combineReducers({
  currentUser,
  messages,
  users,
  debug
});

export default chat;

